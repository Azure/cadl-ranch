# coding=utf-8
# --------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See License.txt in the project root for license information.
# Code generated by Microsoft (R) Python Code Generator.
# Changes may cause incorrect behavior and will be lost if the code is regenerated.
# --------------------------------------------------------------------------

from copy import deepcopy
from typing import Any

from azure.core import PipelineClient
from azure.core.rest import HttpRequest, HttpResponse

from . import models
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
    :vartype basic_ops: cadl.testserver.bodycomplex.operations.BasicOpsOperations
    :ivar primitive: PrimitiveOperations operations
    :vartype primitive: cadl.testserver.bodycomplex.operations.PrimitiveOperations
    :ivar array: ArrayOperations operations
    :vartype array: cadl.testserver.bodycomplex.operations.ArrayOperations
    :ivar dictionary: DictionaryOperations operations
    :vartype dictionary: cadl.testserver.bodycomplex.operations.DictionaryOperations
    :ivar inheritance: InheritanceOperations operations
    :vartype inheritance: cadl.testserver.bodycomplex.operations.InheritanceOperations
    :ivar polymorphism: PolymorphismOperations operations
    :vartype polymorphism: cadl.testserver.bodycomplex.operations.PolymorphismOperations
    :ivar polymorphicrecursive: PolymorphicrecursiveOperations operations
    :vartype polymorphicrecursive:
     cadl.testserver.bodycomplex.operations.PolymorphicrecursiveOperations
    :ivar readonlyproperty: ReadonlypropertyOperations operations
    :vartype readonlyproperty: cadl.testserver.bodycomplex.operations.ReadonlypropertyOperations
    :ivar flattencomplex: FlattencomplexOperations operations
    :vartype flattencomplex: cadl.testserver.bodycomplex.operations.FlattencomplexOperations
    """

    def __init__(self, **kwargs: Any) -> None:  # pylint: disable=missing-client-constructor-parameter-credential
        _endpoint = "http://localhost:3000"
        self._config = ComplexTestServiceConfiguration(**kwargs)
        self._client = PipelineClient(base_url=_endpoint, config=self._config, **kwargs)

        self.basic_ops = BasicOpsOperations(self._client, self._config)
        self.primitive = PrimitiveOperations(self._client, self._config)
        self.array = ArrayOperations(self._client, self._config)
        self.dictionary = DictionaryOperations(self._client, self._config)
        self.inheritance = InheritanceOperations(self._client, self._config)
        self.polymorphism = PolymorphismOperations(self._client, self._config)
        self.polymorphicrecursive = PolymorphicrecursiveOperations(self._client, self._config)
        self.readonlyproperty = ReadonlypropertyOperations(self._client, self._config)
        self.flattencomplex = FlattencomplexOperations(self._client, self._config)

    def send_request(self, request: HttpRequest, **kwargs: Any) -> HttpResponse:
        """Runs the network request through the client's chained policies.

        >>> from azure.core.rest import HttpRequest
        >>> request = HttpRequest("GET", "https://www.example.org/")
        <HttpRequest [GET], url: 'https://www.example.org/'>
        >>> response = client.send_request(request)
        <HttpResponse: 200 OK>

        For more information on this code flow, see https://aka.ms/azsdk/dpcodegen/python/send_request

        :param request: The network request you want to make. Required.
        :type request: ~azure.core.rest.HttpRequest
        :keyword bool stream: Whether the response payload will be streamed. Defaults to False.
        :return: The response of your network call. Does not do error handling on your response.
        :rtype: ~azure.core.rest.HttpResponse
        """

        request_copy = deepcopy(request)
        request_copy.url = self._client.format_url(request_copy.url)
        return self._client.send_request(request_copy, **kwargs)

    def close(self):
        # type: () -> None
        self._client.close()

    def __enter__(self):
        # type: () -> ComplexTestService
        self._client.__enter__()
        return self

    def __exit__(self, *exc_details):
        # type: (Any) -> None
        self._client.__exit__(*exc_details)
