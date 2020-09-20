// package: com.jpan.autodealer.grpc
// file: src/grpc/brand.proto

var src_grpc_brand_pb = require("../../src/grpc/brand_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var BrandService = (function () {
  function BrandService() {}
  BrandService.serviceName = "com.jpan.autodealer.grpc.BrandService";
  return BrandService;
}());

BrandService.create = {
  methodName: "create",
  service: BrandService,
  requestStream: false,
  responseStream: false,
  requestType: src_grpc_brand_pb.BrandRequest,
  responseType: src_grpc_brand_pb.BrandResponse
};

BrandService.list = {
  methodName: "list",
  service: BrandService,
  requestStream: false,
  responseStream: false,
  requestType: src_grpc_brand_pb.ListBrandRequest,
  responseType: src_grpc_brand_pb.ListBrandResponse
};

BrandService.search = {
  methodName: "search",
  service: BrandService,
  requestStream: false,
  responseStream: false,
  requestType: src_grpc_brand_pb.PageBrandRequest,
  responseType: src_grpc_brand_pb.PageBrandResponse
};

exports.BrandService = BrandService;

function BrandServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

BrandServiceClient.prototype.create = function create(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(BrandService.create, {
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

BrandServiceClient.prototype.list = function list(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(BrandService.list, {
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

BrandServiceClient.prototype.search = function search(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(BrandService.search, {
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

exports.BrandServiceClient = BrandServiceClient;

