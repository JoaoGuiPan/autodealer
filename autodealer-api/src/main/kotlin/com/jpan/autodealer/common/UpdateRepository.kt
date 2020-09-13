package com.jpan.autodealer.common

interface UpdateRepository<T> {
    fun update(entity: T): T
}