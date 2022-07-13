/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Argv } from 'yargs';
import { CommandModule, CommandModuleImplementation, CommandScope, Options } from '../../command-builder/command-module';
export declare class CacheCommandModule extends CommandModule implements CommandModuleImplementation {
    command: string;
    describe: string;
    longDescriptionPath: string;
    static scope: CommandScope;
    builder(localYargs: Argv): Argv;
    run(_options: Options<{}>): void;
}
