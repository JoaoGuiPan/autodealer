package com.jpan.autodealer.common

interface CreateRepository<T> {
    fun create(entity: T): T
}