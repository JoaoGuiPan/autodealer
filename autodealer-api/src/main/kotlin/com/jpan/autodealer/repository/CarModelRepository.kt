package com.jpan.autodealer.repository

import com.jpan.autodealer.common.*
import com.jpan.autodealer.model.CarModel
import com.jpan.autodealer.model.CarModelFilter
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.time.LocalDate

interface CarModelRepository: PagingAndSortingRepository<CarModel, Long> {
    @Query(
            " select c from CarModel c " +
            " where (:minYear is null or c.year >= :minYear) " +
            " and (:maxYear is null or c.year <= :maxYear) " +
            " and (coalesce(:brand) is null or c.brand in (:brand)) "
    )
    fun searchModels(@Param("minYear") minYear: Int?, @Param("maxYear") maxYear: Int?,
                     @Param("brand") brand: List<Long>?, pageable: Pageable): Page<CarModel>
}

@Repository
data class CarModelJpaRepository(
        val repository: CarModelRepository
): CreateRepository<CarModel>, UpdateRepository<CarModel>, ListRepository<CarModel>,
        SearchPageRepository<CarModelFilter, CarModel>, ByIdRepository<Long, CarModel> {

    override fun create(entity: CarModel): CarModel {
        return repository.save(entity)
    }

    override fun update(entity: CarModel): CarModel {
        return repository.save(entity)
    }

    override fun listAll(): List<CarModel> {
        return repository.findAll().toList()
    }

    override fun filterBy(filter: CarModelFilter, pageable: Pageable): Page<CarModel> {
        val maxYear = if (filter.maxYear == 0) LocalDate.now().year else filter.maxYear
        return repository.searchModels(filter.minYear, maxYear, filter.getBrandList(), pageable)
    }

    override fun get(id: Long): CarModel? {
        return repository.findById(id).orElse(null)
    }
}