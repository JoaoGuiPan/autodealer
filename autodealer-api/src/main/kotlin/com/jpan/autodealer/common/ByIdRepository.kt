package com.jpan.autodealer.common

interface ByIdRepository<ID, T> {
    fun get(id: ID): T?
}