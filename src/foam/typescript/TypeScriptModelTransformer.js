foam.CLASS({
    package: 'foam.typescript',
    name: 'TypeScriptModelTransformer',

    methods: [
        {
            name: 'transform',
            args: [
                {
                    name: 'model',
                    javaType: 'foam.core.Model'
                }
            ],
            javaReturns: 'foam.typescript.model.TypeScriptClass',
            javaCode: `
        foam.typescript.model.TypeScriptClass tsClass = 
            new foam.typescript.model.TypeScriptClass.Builder(getX())
            .setName(model.getName())
            .build();

        for (foam.core.PropertyInfo prop : model.getAxiomsByClass(foam.core.PropertyInfo.class)) {
          foam.typescript.model.TypeScriptProperty tsProperty =
              new foam.typescript.model.TypeScriptProperty.Builder(getX())
              .setName(prop.getName())
              .setType(mapToTypeScriptType(prop.getClassInfo().getObjClass().getSimpleName()))
              .build();
          tsClass.getProperties().add(tsProperty);
        }

        for (foam.core.MethodInfo method : model.getAxiomsByClass(foam.core.MethodInfo.class)) {
          foam.typescript.model.TypeScriptMethod tsMethod =
              new foam.typescript.model.TypeScriptMethod.Builder(getX())
              .setName(method.getName())
              .setReturnType(mapToTypeScriptType(method.getReturnType().getSimpleName()))
              .build();

          for (foam.core.ArgumentInfo arg : method.getArguments()) {
            foam.typescript.model.TypeScriptParameter tsParam =
                new foam.typescript.model.TypeScriptParameter.Builder(getX())
                .setName(arg.getName())
                .setType(mapToTypeScriptType(arg.getClassInfo().getObjClass().getSimpleName()))
                .build();
            tsMethod.getParameters().add(tsParam);
          }

          tsClass.getMethods().add(tsMethod);
        }

        return tsClass;
      `
        },
        {
            name: 'mapToTypeScriptType',
            args: [
                {
                    name: 'foamType',
                    javaType: 'String'
                }
            ],
            javaReturns: 'String',
            javaCode: `
        switch (foamType) {
          case "String":
            return "string";
          case "Int":
          case "Float":
            return "number";
          case "Boolean":
            return "boolean";
          default:
            return "any";
        }
      `
        }
    ]
});
