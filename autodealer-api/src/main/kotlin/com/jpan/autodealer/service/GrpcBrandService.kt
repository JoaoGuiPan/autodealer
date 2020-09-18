package com.jpan.autodealer.service

import com.jpan.autodealer.common.*
import com.jpan.autodealer.grpc.*
import com.jpan.autodealer.model.Brand
import com.jpan.autodealer.model.BrandFilter
import io.grpc.stub.StreamObserver
import net.devh.boot.grpc.server.service.GrpcService
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
@GrpcService
data class GrpcBrandService(
        val createBrand: CreateRepository<Brand>,
        val listBrands: ListRepository<Brand>,
        val searchBrands: SearchPageRepository<BrandFilter, Brand>
): BrandServiceGrpc.BrandServiceImplBase() {

    override fun create(request: BrandRequest?, responseObserver: StreamObserver<BrandResponse>?) {
        val created = createBrand.create(request!!.toEntity())
        responseObserver!!.onNext(created.fromEntity())
        responseObserver.onCompleted()
    }

    override fun list(request: ListBrandRequest?, responseObserver: StreamObserver<ListBrandResponse>?) {
        val list = listBrands.listAll()
        responseObserver!!.onNext(list.fromEntity())
        responseObserver.onCompleted()
    }

    override fun search(request: PageBrandRequest?, responseObserver: StreamObserver<PageBrandResponse>?) {
        val page = searchBrands.filterBy(BrandFilter(name = request!!.name), PageRequest.of(request.page, request.size))
        responseObserver!!.onNext(page.fromEntity())
        responseObserver.onCompleted()
    }
}