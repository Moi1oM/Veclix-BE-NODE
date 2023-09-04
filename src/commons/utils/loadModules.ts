import * as glob from 'glob';

export function loadModules(globPattern: string): any[] {
  const paths = glob.sync(globPattern);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const modules = paths.map((path) => require(path).default);
  return modules;
}
