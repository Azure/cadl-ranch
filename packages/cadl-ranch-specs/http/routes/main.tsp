import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

/**
 * Define scenario in building the http route/uri
 */
@scenarioService("/routes")
namespace Routes;

@scenario
@scenarioDoc("Simple operation at a fixed endpoint")
@route("fixed")
op fixed(): void;

@scenario
@scenarioDoc("Simple operation at a fixed in an interface")
@route("in-interface")
interface InInterface {
  @route("fixed")
  fixed(): void;
}

@route("path")
namespace PathParameters {
  @scenario
  @scenarioDoc("Path parameter defined implicitly")
  @route("template-only/{param}")
  op templateOnly(param: string): void;

  @scenario
  @scenarioDoc("Path parameter marked with explicit @path")
  @route("explicit/{param}")
  op explicit(@path param: string): void;

  @scenario
  @scenarioDoc("Path parameter annotated with @path but not defined explicitly in the route")
  @route("annotationOnly")
  op annotationOnly(@path param: string): void;

  @route("reserved-expansion")
  namespace ReservedExpansion {
    @scenario
    @scenarioDoc("""
      Defines a path parameter that shouldn't encode reserved characters. It should however still encode the other url characters.
        Param value: "foo/bar baz"
        Expected path: "/routes/path/reserved-expansion/foo/bar%20baz"
      """)
    @route("template/{+param}")
    op template(param: string): void;

    @scenario
    @scenarioDoc("Path parameter defined implicitly")
    @route("annotation")
    op annotation(@path(#{ allowReserved: true }) param: string): void;
  }

  @route("simple")
  namespace Simple {
    @route("standard")
    namespace Standard {
      @scenario
      @scenarioDoc("""
        Test simple expansion with explode: false when passed a primitive value.
            Param value: "a"
            Expected path: /routes/simple/standard/primitivea
        """)
      @route("primitive{param}")
      op primitive(param: string): void;

      @scenario
      @scenarioDoc("""
        Test simple expansion with explode: false when passed an array value.
            Param value: ["a","b"]
            Expected path: /routes/simple/standard/primitivea,b
        """)
      @route("array{param}")
      op array(param: string[]): void;

      @scenario
      @scenarioDoc("""
        Test simple expansion with explode: false when passed a record value.
            Param value: {a: 1, b: 2}
            Expected path: /routes/simple/standard/primitivea,1,b,2
        """)
      @route("record{param}")
      op record(param: string[]): void;
    }

    @route("explode")
    namespace Explode {
      @scenario
      @scenarioDoc("""
        Test simple expansion with explode: true when passed a primitive value.
            Param value: "a"
            Expected path: /routes/simple/explode/primitivea
        """)
      @route("primitive{param*}")
      op primitive(param: string): void;

      @scenario
      @scenarioDoc("""
        Test simple expansion with explode: true when passed an array value.
            Param value: ["a","b"]
            Expected path: /routes/simple/explode/primitivea.b
        """)
      @route("array{param*}")
      op array(param: string[]): void;

      @scenario
      @scenarioDoc("""
        Test simple expansion with explode: true when passed a record value.
            Param value: {a: 1, b: 2}
            Expected path: /routes/simple/explode/primitivea=1,b=2
        """)
      @route("record{param*}")
      op record(param: string[]): void;
    }
  }

  @route("path")
  namespace Path {
    @route("standard")
    namespace Standard {
      @scenario
      @scenarioDoc("""
        Test path expansion with explode: false when passed a primitive value.
            Param value: "a"
            Expected path: /routes/path/standard/primitive/a
        """)
      @route("primitive{/param}")
      op primitive(param: string): void;

      @scenario
      @scenarioDoc("""
        Test path expansion with explode: false when passed an array value.
            Param value: ["a","b"]
            Expected path: /routes/path/standard/primitive/a,b
        """)
      @route("array{/param}")
      op array(param: string[]): void;

      @scenario
      @scenarioDoc("""
        Test path expansion with explode: false when passed a record value.
            Param value: {a: 1, b: 2}
            Expected path: /routes/path/standard/primitive/a,1,b,2
        """)
      @route("record{/param}")
      op record(param: string[]): void;
    }

    @route("explode")
    namespace Explode {
      @scenario
      @scenarioDoc("""
        Test path expansion with explode: true when passed a primitive value.
            Param value: "a"
            Expected path: /routes/path/explode/primitive/a
        """)
      @route("primitive{/param*}")
      op primitive(param: string): void;

      @scenario
      @scenarioDoc("""
        Test path expansion with explode: true when passed an array value.
            Param value: ["a","b"]
            Expected path: /routes/path/explode/primitive/a/b
        """)
      @route("array{/param*}")
      op array(param: string[]): void;

      @scenario
      @scenarioDoc("""
        Test path expansion with explode: true when passed a record value.
            Param value: {a: 1, b: 2}
            Expected path: /routes/path/explode/primitive/a=1/b=2
        """)
      @route("record{/param*}")
      op record(param: string[]): void;
    }
  }

  @route("label")
  namespace Label {
    @route("standard")
    namespace Standard {
      @scenario
      @scenarioDoc("""
        Test label expansion with explode: false when passed a primitive value.
            Param value: "a"
            Expected path: /routes/label/standard/primitive.a
        """)
      @route("primitive{.param}")
      op primitive(param: string): void;

      @scenario
      @scenarioDoc("""
        Test label expansion with explode: false when passed an array value.
            Param value: ["a","b"]
            Expected path: /routes/label/standard/primitive.a,b
        """)
      @route("array{.param}")
      op array(param: string[]): void;

      @scenario
      @scenarioDoc("""
        Test label expansion with explode: false when passed a record value.
            Param value: {a: 1, b: 2}
            Expected path: /routes/label/standard/primitive.a,1,b,2
        """)
      @route("record{.param}")
      op record(param: string[]): void;
    }

    @route("explode")
    namespace Explode {
      @scenario
      @scenarioDoc("""
        Test label expansion with explode: true when passed a primitive value.
            Param value: "a"
            Expected path: /routes/label/explode/primitive.a
        """)
      @route("primitive{.param*}")
      op primitive(param: string): void;

      @scenario
      @scenarioDoc("""
        Test label expansion with explode: true when passed an array value.
            Param value: ["a","b"]
            Expected path: /routes/label/explode/primitive.a.b
        """)
      @route("array{.param*}")
      op array(param: string[]): void;

      @scenario
      @scenarioDoc("""
        Test label expansion with explode: true when passed a record value.
            Param value: {a: 1, b: 2}
            Expected path: /routes/label/explode/primitive.a=1.b=2
        """)
      @route("record{.param*}")
      op record(param: string[]): void;
    }
  }

  @route("fragment")
  namespace Fragment {
    @route("standard")
    namespace Standard {
      @scenario
      @scenarioDoc("""
        Test fragment expansion with explode: false when passed a primitive value.
            Param value: "a"
            Expected path: /routes/fragment/standard/primitive#a
        """)
      @route("primitive{#param}")
      op primitive(param: string): void;

      @scenario
      @scenarioDoc("""
        Test fragment expansion with explode: false when passed an array value.
            Param value: ["a","b"]
            Expected path: /routes/fragment/standard/primitive#a,b
        """)
      @route("array{#param}")
      op array(param: string[]): void;

      @scenario
      @scenarioDoc("""
        Test fragment expansion with explode: false when passed a record value.
            Param value: {a: 1, b: 2}
            Expected path: /routes/fragment/standard/primitive#a,1,b,2
        """)
      @route("record{#param}")
      op record(param: string[]): void;
    }

    @route("explode")
    namespace Explode {
      @scenario
      @scenarioDoc("""
        Test fragment expansion with explode: true when passed a primitive value.
            Param value: "a"
            Expected path: /routes/fragment/explode/primitive#a
        """)
      @route("primitive{#param*}")
      op primitive(param: string): void;

      @scenario
      @scenarioDoc("""
        Test fragment expansion with explode: true when passed an array value.
            Param value: ["a","b"]
            Expected path: /routes/fragment/explode/primitive#a.b
        """)
      @route("array{#param*}")
      op array(param: string[]): void;

      @scenario
      @scenarioDoc("""
        Test fragment expansion with explode: true when passed a record value.
            Param value: {a: 1, b: 2}
            Expected path: /routes/fragment/explode/primitive#a=1,b=2
        """)
      @route("record{#param*}")
      op record(param: string[]): void;
    }
  }

  @route("matrix")
  namespace Matrix {
    @route("standard")
    namespace Standard {
      @scenario
      @scenarioDoc("""
        Test matrix expansion with explode: false when passed a primitive value.
            Param value: "a"
            Expected path: /routes/matrix/standard/primitive;a
        """)
      @route("primitive{;param}")
      op primitive(param: string): void;

      @scenario
      @scenarioDoc("""
        Test matrix expansion with explode: false when passed an array value.
            Param value: ["a","b"]
            Expected path: /routes/matrix/standard/primitive;a,b
        """)
      @route("array{;param}")
      op array(param: string[]): void;

      @scenario
      @scenarioDoc("""
        Test matrix expansion with explode: false when passed a record value.
            Param value: {a: 1, b: 2}
            Expected path: /routes/matrix/standard/primitive;a,1,b,2
        """)
      @route("record{;param}")
      op record(param: string[]): void;
    }

    @route("explode")
    namespace Explode {
      @scenario
      @scenarioDoc("""
        Test matrix expansion with explode: true when passed a primitive value.
            Param value: "a"
            Expected path: /routes/matrix/explode/primitive;a
        """)
      @route("primitive{;param*}")
      op primitive(param: string): void;

      @scenario
      @scenarioDoc("""
        Test matrix expansion with explode: true when passed an array value.
            Param value: ["a","b"]
            Expected path: /routes/matrix/explode/primitive;a.b
        """)
      @route("array{;param*}")
      op array(param: string[]): void;

      @scenario
      @scenarioDoc("""
        Test matrix expansion with explode: true when passed a record value.
            Param value: {a: 1, b: 2}
            Expected path: /routes/matrix/explode/primitive;a=1;b=2
        """)
      @route("record{;param*}")
      op record(param: string[]): void;
    }
  }
}

@route("query")
namespace QueryParameters {
  @scenario
  @scenarioDoc("Query parameter defined implicitly")
  @route("template-only{?param}")
  op templateOnly(param: string): void;

  @scenario
  @scenarioDoc("Query parameter marked with explicit @query")
  @route("explicit{?param}")
  op explicit(@query param: string): void;

  @scenario
  @scenarioDoc("Query parameter annotated with @query but not defined explicitly in the route")
  @route("annotationOnly")
  op annotationOnly(@query param: string): void;

  @route("query-expansion")
  namespace QueryExpansion {
    @route("standard")
    namespace Standard {
      @scenario
      @scenarioDoc("""
        Test query expansion with explode: false when passed a primitive value.
            Param value: "a"
            Expected path: /routes/query/standard/primitive?param=a
        """)
      @route("primitive{?param}")
      op primitive(param: string): void;

      @scenario
      @scenarioDoc("""
        Test query expansion with explode: false when passed an array value.
            Param value: ["a","b"]
            Expected path: /routes/query/standard/primitive?param=a,b
        """)
      @route("array{?param}")
      op array(param: string[]): void;

      @scenario
      @scenarioDoc("""
        Test query expansion with explode: false when passed a record value.
            Param value: {a: 1, b: 2}
            Expected path: /routes/query/standard/primitive?param=a,1,b,2
        """)
      @route("record{?param}")
      op record(param: string[]): void;
    }

    @route("explode")
    namespace Explode {
      @scenario
      @scenarioDoc("""
        Test query expansion with explode: true when passed a primitive value.
            Param value: "a"
            Expected path: /routes/query/explode/primitive?param=a
        """)
      @route("primitive{?param*}")
      op primitive(param: string): void;

      @scenario
      @scenarioDoc("""
        Test query expansion with explode: true when passed an array value.
            Param value: ["a","b"]
            Expected path: /routes/query/explode/primitive?param=a&param=b
        """)
      @route("array{?param*}")
      op array(param: string[]): void;

      @scenario
      @scenarioDoc("""
        Test query expansion with explode: true when passed a record value.
            Param value: {a: 1, b: 2}
            Expected path: /routes/query/explode/primitive?a=1&b=2
        """)
      @route("record{?param*}")
      op record(param: string[]): void;
    }
  }

  @route("query-continuation")
  namespace QueryContinuation {
    @route("standard")
    namespace Standard {
      @scenario
      @scenarioDoc("""
        Test query continuation expansion with explode: false when passed a primitive value.
            Param value: "a"
            Expected path: /routes/query/standard/primitive?fixed=true&param=a
        """)
      @route("primitive?fixed=true{&param}")
      op primitive(param: string): void;

      @scenario
      @scenarioDoc("""
        Test query continuation expansion with explode: false when passed an array value.
            Param value: ["a","b"]
            Expected path: /routes/query/standard/primitive?fixed=true&param=a,b
        """)
      @route("array?fixed=true{&param}")
      op array(param: string[]): void;

      @scenario
      @scenarioDoc("""
        Test query continuation expansion with explode: false when passed a record value.
            Param value: {a: 1, b: 2}
            Expected path: /routes/query/standard/primitive?fixed=true&param=a,1,b,2
        """)
      @route("record?fixed=true{&param}")
      op record(param: string[]): void;
    }

    @route("explode")
    namespace Explode {
      @scenario
      @scenarioDoc("""
        Test query continuation expansion with explode: true when passed a primitive value.
            Param value: "a"
            Expected path: /routes/query/explode/primitive?fixed=true&param=a
        """)
      @route("primitive?fixed=true{&param*}")
      op primitive(param: string): void;

      @scenario
      @scenarioDoc("""
        Test query continuation expansion with explode: true when passed an array value.
            Param value: ["a","b"]
            Expected path: /routes/query/explode/primitive?fixed=true&param=a&param=b
        """)
      @route("array?fixed=true{&param*}")
      op array(param: string[]): void;

      @scenario
      @scenarioDoc("""
        Test query continuation expansion with explode: true when passed a record value.
            Param value: {a: 1, b: 2}
            Expected path: /routes/query/explode/primitive?fixed=true&a=1&b=2
        """)
      @route("record?fixed=true{&param*}")
      op record(param: string[]): void;
    }
  }
}
