package com.jpan.autodealer.repository

import com.jpan.autodealer.common.CreateRepository
import com.jpan.autodealer.common.SearchPageRepository
import com.jpan.autodealer.common.UpdateRepository
import com.jpan.autodealer.model.CarModel
import com.jpan.autodealer.model.CarModelFilter
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

interface CarModelRepository: PagingAndSortingRepository<CarModel, Long> {
    @Query(
            " select c from CarModel c " +
            " where (:minYear is null or c.year >= :minYear) " +
            " and (:maxYear is null or c.year <= :maxYear) " +
            " and (:brand is null or c.brand.id = :brand) "
    )
    fun searchModels(@Param("minYear") minYear: Int?, @Param("maxYear") maxYear: Int?,
                     @Param("brand") brand: Long?, pageable: Pageable): Page<CarModel>
}

@Repository
data class CarModelJpaRepository(
        val repository: CarModelRepository
): CreateRepository<CarModel>, UpdateRepository<CarModel>, SearchPageRepository<CarModelFilter, CarModel> {

    override fun create(entity: CarModel): CarModel {
        return repository.save(entity)
    }

    override fun update(entity: CarModel): CarModel {
        return repository.save(entity)
    }

    override fun filterBy(filter: CarModelFilter, pageable: Pageable): Page<CarModel> {
        return repository.searchModels(filter.minYear, filter.maxYear, filter.make, pageable)
    }
}