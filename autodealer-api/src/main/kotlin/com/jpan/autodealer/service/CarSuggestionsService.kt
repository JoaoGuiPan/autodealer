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
        // TODO
        return PageImpl<CarModel>(listAll, pageable, listAll.size.toLong())
    }
}