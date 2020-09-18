package com.jpan.autodealer.common

import com.jpan.autodealer.grpc.BrandRequest
import com.jpan.autodealer.grpc.BrandResponse
import com.jpan.autodealer.grpc.ListBrandResponse
import com.jpan.autodealer.grpc.PageBrandResponse
import com.jpan.autodealer.model.Brand
import org.springframework.data.domain.Page

fun BrandRequest.toEntity() = Brand(
        name = this.name
)

fun List<Brand>.fromEntity(): ListBrandResponse = ListBrandResponse.newBuilder()
        .addAllBrands(this.map { it.fromEntity() })
        .build()

fun Brand.fromEntity(): BrandResponse = BrandResponse.newBuilder()
        .setId(this.id!!)
        .setName(this.name)
        .build()

fun Page<Brand>.fromEntity(): PageBrandResponse = PageBrandResponse.newBuilder()
        .addAllContent(this.content.map { it.fromEntity() })
        .setPage(this.pageable.pageNumber)
        .setSize(this.pageable.pageSize)
        .setTotalElements(this.totalElements)
        .build()