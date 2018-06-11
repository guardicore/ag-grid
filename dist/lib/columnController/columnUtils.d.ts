// Type definitions for ag-grid v18.0.0
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { ColumnGroupChild } from "../entities/columnGroupChild";
import { OriginalColumnGroupChild } from "../entities/originalColumnGroupChild";
import { OriginalColumnGroup } from "../entities/originalColumnGroup";
import { Column } from "../entities/column";
export declare class ColumnUtils {
    private gridOptionsWrapper;
    calculateColInitialWidth(colDef: any): number;
    getOriginalPathForColumn(column: Column, originalBalancedTree: OriginalColumnGroupChild[]): OriginalColumnGroup[];
    depthFirstOriginalTreeSearch(tree: OriginalColumnGroupChild[], callback: (treeNode: OriginalColumnGroupChild) => void): void;
    depthFirstAllColumnTreeSearch(tree: ColumnGroupChild[], callback: (treeNode: ColumnGroupChild) => void): void;
    depthFirstDisplayedColumnTreeSearch(tree: ColumnGroupChild[], callback: (treeNode: ColumnGroupChild) => void): void;
}
