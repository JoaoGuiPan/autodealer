package com.jpan.autodealer.controller

import com.jpan.autodealer.common.CreateRepository
import com.jpan.autodealer.common.SearchPageRepository
import com.jpan.autodealer.common.UpdateRepository
import com.jpan.autodealer.model.CarModel
import com.jpan.autodealer.model.CarModelFilter
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@Api(value = "Car Models", description = "REST endpoints responsible for the car models management")
@RestController
@RequestMapping("carmodels")
data class CarModelController(
        val createModel: CreateRepository<CarModel>,
        val updateModel: UpdateRepository<CarModel>,
        val searchModel: SearchPageRepository<CarModelFilter, CarModel>
) {

    val logger: Logger = LoggerFactory.getLogger(CarModelController::class.java)

    @ApiOperation(value = "Create Car Model")
    @PostMapping
    fun create(@RequestBody @Valid payload: CarModel): CarModel {
        logger.debug("Creating new Car Model - $payload")
        val created = createModel.create(payload)
        logger.info("Car Model created: ${created.name}")
        return created
    }

    @ApiOperation(value = "Update Car Model")
    @PutMapping("{model}")
    fun update(@PathVariable model: CarModel, @RequestBody @Valid payload: CarModel): CarModel {
        logger.debug("Updating Car Model ${model.name}")
        val updated = updateModel.update(
                // avoids id, name and brand rewrite by the client
                model.copy(
                        version = payload.version,
                        year = payload.year,
                        price = payload.price,
                        fuelType = payload.fuelType,
                        fuelConsumptionKmPerL = payload.fuelConsumptionKmPerL,
                        annualMaintenanceCost = payload.annualMaintenanceCost
                )
        )
        logger.info("Car Model updated - $updated")
        return updated
    }

    @ApiOperation(value = "Fetch Car Model by id")
    @GetMapping("{model}")
    fun getById(@PathVariable model: CarModel): CarModel {
        logger.info("Fetching Car Model ${model.name}")
        return model
    }

    // TODO
    fun search() {
    }
}