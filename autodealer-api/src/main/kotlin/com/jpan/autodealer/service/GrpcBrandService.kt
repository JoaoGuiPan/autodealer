package com.jpan.autodealer.service

import com.jpan.autodealer.common.CreateRepository
import com.jpan.autodealer.common.ListRepository
import com.jpan.autodealer.common.SearchPageRepository
import com.jpan.autodealer.grpc.*
import com.jpan.autodealer.model.BrandFilter
import io.grpc.stub.StreamObserver
import net.devh.boot.grpc.server.service.GrpcService
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
@GrpcService
data class GrpcBrandService(
        val createBrand: CreateRepository<com.jpan.autodealer.model.Brand>,
        val listBrands: ListRepository<com.jpan.autodealer.model.Brand>,
        val searchBrands: SearchPageRepository<com.jpan.autodealer.model.BrandFilter, com.jpan.autodealer.model.Brand>
): BrandServiceGrpc.BrandServiceImplBase() {

    override fun create(request: BrandRequest?, responseObserver: StreamObserver<Brand>?) {
        val (id, name) = createBrand.create(com.jpan.autodealer.model.Brand(name = request!!.name))

        val brand = Brand.newBuilder()
                .setId(id!!)
                .setName(name)
                .build()

        responseObserver!!.onNext(brand)
        responseObserver.onCompleted()
    }

    override fun list(request: ListBrandRequest?, responseObserver: StreamObserver<ListBrandResponse>?) {
        val list = listBrands.listAll()

        val brandList = ListBrandResponse.newBuilder()
                .addAllBrands(list.map {
                    Brand.newBuilder()
                        .setId(it.id!!)
                        .setName(it.name)
                        .build()
                })
                .build()

        responseObserver!!.onNext(brandList)
        responseObserver.onCompleted()
    }

    override fun search(request: PageBrandRequest?, responseObserver: StreamObserver<PageBrandResponse>?) {
        val filter = BrandFilter(name = request!!.name)
        val pageable = PageRequest.of(request.page.toInt(), request.size.toInt())
        val page = searchBrands.filterBy(filter, pageable)

        val response = PageBrandResponse.newBuilder()
                .addAllContent(page.content.map {
                    Brand.newBuilder()
                            .setId(it.id!!)
                            .setName(it.name)
                            .build()
                })
                .setPageNumber(request.page)
                .setSize(request.size)
                .build()

        responseObserver!!.onNext(response)
        responseObserver.onCompleted()
    }
}