import { ITypeGenerator } from "./type-generator.model";

export interface Generator{
  typeGenerator: ITypeGenerator;
}

export class LinealGenerator implements Generator {

  typeGenerator: ITypeGenerator;
}

export class MultiplicativeGenerator implements Generator{
  typeGenerator: ITypeGenerator;
}

export class LanguageGenerator implements Generator{
  typeGenerator: ITypeGenerator;
}
