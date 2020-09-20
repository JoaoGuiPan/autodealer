// package: com.jpan.autodealer.grpc
// file: src/grpc/car_model.proto

var src_grpc_car_model_pb = require("../../src/grpc/car_model_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var CarModelService = (function () {
  function CarModelService() {}
  CarModelService.serviceName = "com.jpan.autodealer.grpc.CarModelService";
  return CarModelService;
}());

CarModelService.create = {
  methodName: "create",
  service: CarModelService,
  requestStream: false,
  responseStream: false,
  requestType: src_grpc_car_model_pb.CarModelCreateRequest,
  responseType: src_grpc_car_model_pb.CarModelVO
};

CarModelService.update = {
  methodName: "update",
  service: CarModelService,
  requestStream: false,
  responseStream: false,
  requestType: src_grpc_car_model_pb.CarModelVO,
  responseType: src_grpc_car_model_pb.CarModelVO
};

CarModelService.fetch = {
  methodName: "fetch",
  service: CarModelService,
  requestStream: false,
  responseStream: false,
  requestType: src_grpc_car_model_pb.CarModelFetchRequest,
  responseType: src_grpc_car_model_pb.CarModelVO
};

CarModelService.search = {
  methodName: "search",
  service: CarModelService,
  requestStream: false,
  responseStream: false,
  requestType: src_grpc_car_model_pb.CarModelSearchRequest,
  responseType: src_grpc_car_model_pb.PageCarModelResponse
};

CarModelService.suggest = {
  methodName: "suggest",
  service: CarModelService,
  requestStream: false,
  responseStream: false,
  requestType: src_grpc_car_model_pb.CarModelSuggestionRequest,
  responseType: src_grpc_car_model_pb.PageCarModelResponse
};

exports.CarModelService = CarModelService;

function CarModelServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

CarModelServiceClient.prototype.create = function create(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CarModelService.create, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

CarModelServiceClient.prototype.update = function update(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CarModelService.update, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

CarModelServiceClient.prototype.fetch = function fetch(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CarModelService.fetch, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

CarModelServiceClient.prototype.search = function search(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CarModelService.search, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

CarModelServiceClient.prototype.suggest = function suggest(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CarModelService.suggest, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.CarModelServiceClient = CarModelServiceClient;

