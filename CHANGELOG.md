# Changelog

All notable changes to **antlr-calculator** are documented here.

## v2.2.0:
- Added support for `Min` and `Max` formulas

## v2.1.0:
- The calculator now supports trailing comments in a formula, separated by a semicolon `;` at the end of the actual formula input. For example, `1 + 2; Hello World!` now just evaluates `1 + 2` and ignores everything after the semicolon `;`
- Add support for substitutions in formulas

## v2.0.4:
- The internal check for null or empty formulas was changed for better compatibility with Node

## v2.0.3:
- Automatic creation of GitHub releases was added

## v2.0.0:
- The library was updated to use the Antlr TypeScript target instead of the older JavaScript package
