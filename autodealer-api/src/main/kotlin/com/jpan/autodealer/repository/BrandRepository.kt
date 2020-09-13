package com.jpan.autodealer.repository

import com.jpan.autodealer.common.CreateRepository
import com.jpan.autodealer.common.ListRepository
import com.jpan.autodealer.common.UpdateRepository
import com.jpan.autodealer.model.Brand
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

interface BrandRepository: CrudRepository<Brand, Long>

@Repository
data class BrandJpaRepository(
        val repository: BrandRepository
): CreateRepository<Brand>, UpdateRepository<Brand>, ListRepository<Brand> {

    override fun create(entity: Brand): Brand {
        return repository.save(entity)
    }

    override fun update(entity: Brand): Brand {
        return repository.save(entity)
    }

    override fun listAll(): List<Brand> {
        return repository.findAll().toList()
    }
}