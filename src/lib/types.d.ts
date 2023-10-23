import type {Asset, ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode} from "contentful";

export interface TypePortfolioPostFields {
  titulo: EntryFieldTypes.Symbol;
  tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  featureImage?: Asset;
  desarrollo?: EntryFieldTypes.RichText;
  fechaDeEntrada: EntryFieldTypes.Date;
}

export type TypePortfolioPostSkeleton = EntrySkeletonType<TypePortfolioPostFields, "portfolioPost">;
export type TypePortfolioPost<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePortfolioPostSkeleton, Modifiers, Locales>;

export interface TypeProyectoFields {
  nombre: EntryFieldTypes.Symbol;
  desc: EntryFieldTypes.Symbol;
  href?: EntryFieldTypes.Text;
}

export type TypeProyectoSkeleton = EntrySkeletonType<TypeProyectoFields, "proyecto">;
export type TypeProyecto<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeProyectoSkeleton, Modifiers, Locales>;

export interface TypeRenderFields {
  imageFile?: EntryFieldTypes.AssetLink;
  descripcion?: EntryFieldTypes.Symbol;
}

export type TypeRenderSkeleton = EntrySkeletonType<TypeRenderFields, "render">;
export type TypeRender<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeRenderSkeleton, Modifiers, Locales>;
