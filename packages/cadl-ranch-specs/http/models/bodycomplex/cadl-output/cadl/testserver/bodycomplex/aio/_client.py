# coding=utf-8
# --------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See License.txt in the project root for license information.
# Code generated by Microsoft (R) Python Code Generator.
# Changes may cause incorrect behavior and will be lost if the code is regenerated.
# --------------------------------------------------------------------------

from copy import deepcopy
from typing import Any, Awaitable

from azure.core import AsyncPipelineClient
from azure.core.rest import AsyncHttpResponse, HttpRequest

from .. import models
from .._serialization import Deserializer, Serializer
from ._configuration import ComplexTestServiceConfiguration
from .operations import (
    ArrayOperations,
    BasicOpsOperations,
    DictionaryOperations,
    FlattencomplexOperations,
    InheritanceOperations,
    PolymorphicrecursiveOperations,
    PolymorphismOperations,
    PrimitiveOperations,
    ReadonlypropertyOperations,
)


class ComplexTestService:  # pylint: disable=client-accepts-api-version-keyword,too-many-instance-attributes
    """Service client.

    :ivar basic_ops: BasicOpsOperations operations
    :vartype basic_ops: cadl.testserver.bodycomplex.aio.operations.BasicOpsOperations
    :ivar primitive: PrimitiveOperations operations
    :vartype primitive: cadl.testserver.bodycomplex.aio.operations.PrimitiveOperations
    :ivar array: ArrayOperations operations
    :vartype array: cadl.testserver.bodycomplex.aio.operations.ArrayOperations
    :ivar dictionary: DictionaryOperations operations
    :vartype dictionary: cadl.testserver.bodycomplex.aio.operations.DictionaryOperations
    :ivar inheritance: InheritanceOperations operations
    :vartype inheritance: cadl.testserver.bodycomplex.aio.operations.InheritanceOperations
    :ivar polymorphism: PolymorphismOperations operations
    :vartype polymorphism: cadl.testserver.bodycomplex.aio.operations.PolymorphismOperations
    :ivar polymorphicrecursive: PolymorphicrecursiveOperations operations
    :vartype polymorphicrecursive:
     cadl.testserver.bodycomplex.aio.operations.PolymorphicrecursiveOperations
    :ivar readonlyproperty: ReadonlypropertyOperations operations
    :vartype readonlyproperty:
     cadl.testserver.bodycomplex.aio.operations.ReadonlypropertyOperations
    :ivar flattencomplex: FlattencomplexOperations operations
    :vartype flattencomplex: cadl.testserver.bodycomplex.aio.operations.FlattencomplexOperations
    """

    def __init__(self, **kwargs: Any) -> None:  # pylint: disable=missing-client-constructor-parameter-credential
        _endpoint = "http://localhost:3000"
        self._config = ComplexTestServiceConfiguration(**kwargs)
        self._client = AsyncPipelineClient(base_url=_endpoint, config=self._config, **kwargs)

        client_models = {k: v for k, v in models.__dict__.items() if isinstance(v, type)}
        self._serialize = Serializer(client_models)
        self._deserialize = Deserializer(client_models)
        self._serialize.client_side_validation = False
        self.basic_ops = BasicOpsOperations(self._client, self._config, self._serialize, self._deserialize)
        self.primitive = PrimitiveOperations(self._client, self._config, self._serialize, self._deserialize)
        self.array = ArrayOperations(self._client, self._config, self._serialize, self._deserialize)
        self.dictionary = DictionaryOperations(self._client, self._config, self._serialize, self._deserialize)
        self.inheritance = InheritanceOperations(self._client, self._config, self._serialize, self._deserialize)
        self.polymorphism = PolymorphismOperations(self._client, self._config, self._serialize, self._deserialize)
        self.polymorphicrecursive = PolymorphicrecursiveOperations(
            self._client, self._config, self._serialize, self._deserialize
        )
        self.readonlyproperty = ReadonlypropertyOperations(
            self._client, self._config, self._serialize, self._deserialize
        )
        self.flattencomplex = FlattencomplexOperations(self._client, self._config, self._serialize, self._deserialize)

    def send_request(self, request: HttpRequest, **kwargs: Any) -> Awaitable[AsyncHttpResponse]:
        """Runs the network request through the client's chained policies.

        >>> from azure.core.rest import HttpRequest
        >>> request = HttpRequest("GET", "https://www.example.org/")
        <HttpRequest [GET], url: 'https://www.example.org/'>
        >>> response = await client.send_request(request)
        <AsyncHttpResponse: 200 OK>

        For more information on this code flow, see https://aka.ms/azsdk/dpcodegen/python/send_request

        :param request: The network request you want to make. Required.
        :type request: ~azure.core.rest.HttpRequest
        :keyword bool stream: Whether the response payload will be streamed. Defaults to False.
        :return: The response of your network call. Does not do error handling on your response.
        :rtype: ~azure.core.rest.AsyncHttpResponse
        """

        request_copy = deepcopy(request)
        request_copy.url = self._client.format_url(request_copy.url)
        return self._client.send_request(request_copy, **kwargs)

    async def close(self) -> None:
        await self._client.close()

    async def __aenter__(self) -> "ComplexTestService":
        await self._client.__aenter__()
        return self

    async def __aexit__(self, *exc_details) -> None:
        await self._client.__aexit__(*exc_details)
