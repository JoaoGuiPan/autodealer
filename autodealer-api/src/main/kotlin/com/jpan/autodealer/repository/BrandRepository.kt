package com.jpan.autodealer.repository

import com.jpan.autodealer.common.CreateRepository
import com.jpan.autodealer.common.ListRepository
import com.jpan.autodealer.common.SearchPageRepository
import com.jpan.autodealer.common.UpdateRepository
import com.jpan.autodealer.model.Brand
import com.jpan.autodealer.model.BrandFilter
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

interface BrandRepository: PagingAndSortingRepository<Brand, Long> {

    @Query(" select b from Brand b where (:name is null or lower(b.name) like concat ('%',lower(:name),'%') ) ")
    fun searchBrands(@Param("name") name: String?, pageable: Pageable): Page<Brand>
}

@Repository
data class BrandJpaRepository(
        val repository: BrandRepository
): CreateRepository<Brand>, UpdateRepository<Brand>, ListRepository<Brand>,
        SearchPageRepository<BrandFilter, Brand> {

    override fun create(entity: Brand): Brand {
        return repository.save(entity)
    }

    override fun update(entity: Brand): Brand {
        return repository.save(entity)
    }

    override fun listAll(): List<Brand> {
        return repository.findAll().toList()
    }

    override fun filterBy(filter: BrandFilter, pageable: Pageable): Page<Brand> {
        return repository.searchBrands(filter.name, pageable)
    }
}