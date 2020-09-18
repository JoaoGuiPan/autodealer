package com.jpan.autodealer.service

import com.jpan.autodealer.common.ListRepository
import com.jpan.autodealer.model.CarModel
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import java.math.BigDecimal

@Service
data class CarSuggestionsService(
        val listModels: ListRepository<CarModel>
) {
    fun suggestCarModels(monthlyTravelDistance: BigDecimal?,
                         periodInYears: Int,
                         fuelPriceInEurPerL: BigDecimal?,
                         pageable: Pageable) : Page<CarModel> {

        val listAll = listModels.listAll()

        val suggestions = listAll.sortedBy {
            it.price!!.divide(BigDecimal(periodInYears)).plus(
                it.annualMaintenanceCost!!.plus(
                    yearlyFuelCosts(monthlyTravelDistance!!, fuelPriceInEurPerL!!, it)
                )
            )
        }

        return PageImpl<CarModel>(content(suggestions, pageable), pageable, suggestions.size.toLong())
    }

    private fun content(suggestions: List<CarModel>, pageable: Pageable): List<CarModel> {
        val offset = pageable.pageNumber * pageable.pageSize
        return suggestions.subList(offset, offset + pageable.pageSize)
    }

    private fun yearlyFuelCosts(monthlyTravelDistance: BigDecimal, fuelPriceInEurPerL: BigDecimal, it: CarModel) =
            (monthlyTravelDistance / it.fuelConsumptionKmPerL!!) * fuelPriceInEurPerL * BigDecimal(12)
}