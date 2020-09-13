package com.jpan.autodealer.common

interface CreateService<E, P> {
    fun create(entity: E, payload: P): E
}