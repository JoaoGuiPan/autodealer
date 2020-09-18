package com.jpan.autodealer.service

import com.jpan.autodealer.common.*
import com.jpan.autodealer.grpc.*
import com.jpan.autodealer.model.CarModel
import com.jpan.autodealer.model.CarModelFilter
import io.grpc.stub.StreamObserver
import net.devh.boot.grpc.server.service.GrpcService
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
@GrpcService
data class GrpcCarModelService(
        val createModel: CreateRepository<CarModel>,
        val updateModel: UpdateRepository<CarModel>,
        val byId: ByIdRepository<Long, CarModel>,
        val searchModel: SearchPageRepository<CarModelFilter, CarModel>,
        val carSuggestionsService: CarSuggestionsService
): CarModelServiceGrpc.CarModelServiceImplBase() {

    override fun create(request: CarModelCreateRequest?, responseObserver: StreamObserver<CarModelVO>?) {
        val created = createModel.create(request!!.toEntity())
        responseObserver!!.onNext(created.fromEntity())
        responseObserver.onCompleted()
    }

    override fun update(request: CarModelVO?, responseObserver: StreamObserver<CarModelVO>?) {
        val created = updateModel.update(request!!.toEntity())
        responseObserver!!.onNext(created.fromEntity())
        responseObserver.onCompleted()
    }

    override fun fetch(request: CarModelFetchRequest?, responseObserver: StreamObserver<CarModelVO>?) {
        val carModel = byId.get(request!!.id)
        responseObserver!!.onNext(carModel?.fromEntity())
        responseObserver.onCompleted()
    }

    override fun search(request: CarModelSearchRequest?, responseObserver: StreamObserver<PageCarModelResponse>?) {
        val page = searchModel.filterBy(request!!.toFilter(), PageRequest.of(request.page, request.size))
        responseObserver!!.onNext(page.fromEntity())
        responseObserver.onCompleted()
    }

    override fun suggest(request: CarModelSuggestionRequest?, responseObserver: StreamObserver<PageCarModelResponse>?) {
        val page = carSuggestionsService.suggestCarModels(
                request!!.monthlyTravelDistance.toBigDecimalOrNull(),
                request.periodInYears,
                request.fuelPriceInEurPerL.toBigDecimalOrNull(),
                PageRequest.of(request.page, request.size)
        )
        responseObserver!!.onNext(page.fromEntity())
        responseObserver.onCompleted()
    }
}