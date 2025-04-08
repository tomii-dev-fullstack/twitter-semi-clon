import { pathsToModuleNameMapper } from 'ts-jest';
import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Usa ts-jest para archivos .ts y .tsx
  },
  testEnvironment: 'jsdom', // Para pruebas de React
  testRegex: '/src/tests/.*\\.(test|spec)\\.(ts|tsx)$', // Ajuste en la expresión regular
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  rootDir: './', // Asegúrate de que Jest busque desde la raíz del proyecto
  moduleNameMapper: pathsToModuleNameMapper(
    {
      '@/*': ['src/*'], // Mapea el alias '@' a la ruta de src
    },
    { prefix: '<rootDir>/' } // Asegúrate de que Jest resuelva correctamente los alias
  ),
};

export default config;
