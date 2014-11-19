// Generated by CoffeeScript 1.8.0
(function() {
  var APIBlueprintGenerator;

  require("mustache.js");

  APIBlueprintGenerator = function() {
    this.response = function(exchange) {
      var body, body_indentation, has_body, has_headers, headers, key, value, _ref;
      if (!exchange) {
        return null;
      }
      headers = [];
      _ref = exchange.responseHeaders;
      for (key in _ref) {
        value = _ref[key];
        if (key === 'Content-Type' || key === 'Connection' || key === 'Date' || key === 'Via' || key === 'Server' || key === 'Content-Length') {
          continue;
        }
        headers.push({
          key: key,
          value: value
        });
      }
      has_headers = headers.length > 0;
      body = exchange.responseBody;
      has_body = body.length > 0;
      if (has_body) {
        body_indentation = '        ';
        if (has_headers) {
          body_indentation += '    ';
        }
        body = body.replace(/^/gm, body_indentation);
      }
      return {
        statusCode: exchange.responseStatusCode,
        contentType: exchange.responseHeaders['Content-Type'],
        "headers?": has_headers,
        headers: headers,
        "body?": has_headers && has_body,
        body: body
      };
    };
    this.request = function(paw_request) {
      var body, body_indentation, has_body, has_headers, headers, key, value, _ref;
      headers = [];
      _ref = paw_request.headers;
      for (key in _ref) {
        value = _ref[key];
        if (key === 'Content-Type') {
          continue;
        }
        headers.push({
          key: key,
          value: value
        });
      }
      has_headers = headers.length > 0;
      body = paw_request.body;
      has_body = body.length > 0;
      if (has_body) {
        body_indentation = '        ';
        if (has_headers) {
          body_indentation += '    ';
        }
        body = body.replace(/^/gm, body_indentation);
      }
      if (has_headers || has_body || paw_request.headers['Content-Type']) {
        return {
          "headers?": has_headers,
          headers: headers,
          contentType: paw_request.headers['Content-Type'],
          "body?": has_headers && has_body,
          body: body
        };
      }
    };
    this.path = function(url) {
      var path;
      path = url.replace(/^https?:\/\/[^\/]+/i, '');
      if (!path) {
        path = '/';
      }
      return path;
    };
    this.generate = function(context) {
      var paw_request, template, url;
      paw_request = context.getCurrentRequest();
      url = paw_request.url;
      template = readFile("apiblueprint.mustache");
      return Mustache.render(template, {
        method: paw_request.method,
        path: this.path(url),
        request: this.request(paw_request),
        response: this.response(paw_request.getLastExchange())
      });
    };
  };

  APIBlueprintGenerator.identifier = "io.apiary.PawExtensions.APIBlueprintGenerator";

  APIBlueprintGenerator.title = "API Blueprint Generator";

  registerCodeGenerator(APIBlueprintGenerator);

}).call(this);