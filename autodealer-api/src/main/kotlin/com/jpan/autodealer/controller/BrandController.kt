package com.jpan.autodealer.controller

import com.jpan.autodealer.common.CreateRepository
import com.jpan.autodealer.common.ListRepository
import com.jpan.autodealer.model.Brand
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@Api(value = "Car Brands", description = "REST endpoints responsible for the car brands management")
@RestController
@RequestMapping("brands")
data class BrandController(
        val createBrand: CreateRepository<Brand>,
        val listBrands: ListRepository<Brand>
) {

    val logger: Logger = LoggerFactory.getLogger(BrandController::class.java)

    @ApiOperation(value = "Create Brand")
    @PostMapping
    fun create(@RequestBody @Valid payload: Brand): Brand {
        logger.debug("Creating new Brand - $payload")
        val created = createBrand.create(payload)
        logger.info("Brand created: ${created.name}")
        return created
    }

    @ApiOperation(value = "Search Brands by name")
    @GetMapping
    fun list(): List<Brand> {
        logger.info("Fetching all Brands")
        return listBrands.listAll()
    }
}