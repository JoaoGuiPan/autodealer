package com.jpan.autodealer.common

import com.jpan.autodealer.grpc.*
import com.jpan.autodealer.model.CarModel
import com.jpan.autodealer.model.CarModelFilter
import org.springframework.data.domain.Page

fun CarModelCreateRequest.toEntity() = CarModel(
        name = this.name,
        brand = this.brand,
        version = this.version,
        year = this.year,
        price = this.price.toBigDecimalOrNull(),
        fuelType = CarModel.FuelType.valueOf(this.fuelType.name),
        fuelConsumptionKmPerL = this.fuelConsumptionKmPerL.toBigDecimalOrNull(),
        annualMaintenanceCost = this.annualMaintenanceCost.toBigDecimalOrNull()
)

fun CarModelVO.toEntity() = CarModel(
        id = this.id,
        name = this.name,
        brand = this.brand,
        version = this.version,
        year = this.year,
        price = this.price.toBigDecimalOrNull(),
        fuelType = CarModel.FuelType.valueOf(this.fuelType.name),
        fuelConsumptionKmPerL = this.fuelConsumptionKmPerL.toBigDecimalOrNull(),
        annualMaintenanceCost = this.annualMaintenanceCost.toBigDecimalOrNull()
)

fun CarModelSearchRequest.toFilter() = CarModelFilter(
        minYear = this.minYear,
        maxYear = this.maxYear,
        make = this.makeList
)

fun CarModel.fromEntity(): CarModelVO = CarModelVO.newBuilder()
        .setId(this.id!!)
        .setName(this.name)
        .setBrand(this.brand!!)
        .setVersion(this.version)
        .setYear(this.year!!)
        .setPrice(this.price.toString())
        .setFuelType(FuelType.valueOf(this.fuelType.toString()))
        .setFuelConsumptionKmPerL(this.fuelConsumptionKmPerL.toString())
        .setAnnualMaintenanceCost(this.annualMaintenanceCost.toString())
        .build()

fun Page<CarModel>.fromEntity(): PageCarModelResponse = PageCarModelResponse.newBuilder()
        .addAllContent(this.content.map { it.fromEntity() })
        .setPage(this.pageable.pageNumber)
        .setSize(this.pageable.pageSize)
        .setTotalElements(this.totalElements)
        .build()