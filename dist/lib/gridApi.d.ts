// Type definitions for ag-grid v18.0.0
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { ColumnApi } from "./columnController/columnApi";
import { GridPanel } from "./gridPanel/gridPanel";
import { ColDef, ColGroupDef, IAggFunc } from "./entities/colDef";
import { RowNode } from "./entities/rowNode";
import { Column } from "./entities/column";
import { IRowModel } from "./interfaces/iRowModel";
import { AddRangeSelectionParams, RangeSelection } from "./interfaces/iRangeController";
import { GridCell, GridCellDef } from "./entities/gridCell";
import { IViewportDatasource } from "./interfaces/iViewportDatasource";
import { IFilterComp } from "./interfaces/iFilter";
import { CsvExportParams } from "./exportParams";
import { ExcelExportParams } from "./interfaces/iExcelCreator";
import { IDatasource } from "./rowModels/iDatasource";
import { IServerSideDatasource } from "./interfaces/iServerSideDatasource";
import { RowDataTransaction, RowNodeTransaction } from "./rowModels/clientSide/clientSideRowModel";
import { AlignedGridsService } from "./alignedGridsService";
import { AgEvent, ColumnEventType } from "./events";
import { ICellRendererComp } from "./rendering/cellRenderers/iCellRenderer";
import { ICellEditorComp } from "./rendering/cellEditors/iCellEditor";
import { HeaderRootComp } from "./headerRendering/headerRootComp";
export interface StartEditingCellParams {
    rowIndex: number;
    colKey: string | Column;
    rowPinned?: string;
    keyPress?: number;
    charPress?: string;
}
export interface GetCellsParams {
    rowNodes?: RowNode[];
    columns?: (string | Column)[];
}
export interface RefreshCellsParams extends GetCellsParams {
    force?: boolean;
}
export interface FlashCellsParams extends GetCellsParams {
}
export interface GetCellRendererInstancesParams extends GetCellsParams {
}
export interface GetCellEditorInstancesParams extends GetCellsParams {
}
export interface RedrawRowsParams {
    rowNodes?: RowNode[];
}
export interface DetailGridInfo {
    id: string;
    api: GridApi;
    columnApi: ColumnApi;
}
export declare class GridApi {
    private immutableService;
    private csvCreator;
    private excelCreator;
    private gridCore;
    private rowRenderer;
    private filterManager;
    private columnController;
    private selectionController;
    private gridOptionsWrapper;
    private valueService;
    private alignedGridsService;
    private eventService;
    private pinnedRowModel;
    private context;
    private rowModel;
    private sortController;
    private paginationProxy;
    private focusedCellController;
    private rangeController;
    private clipboardService;
    private aggFuncService;
    private menuFactory;
    private contextMenuFactory;
    private cellRendererFactory;
    private cellEditorFactory;
    private valueCache;
    private toolPanelComp;
    private animationFrameService;
    private gridPanel;
    private headerRootComp;
    private clientSideRowModel;
    private infinitePageRowModel;
    private serverSideRowModel;
    private detailGridInfoMap;
    registerGridComp(gridPanel: GridPanel): void;
    registerHeaderRootComp(headerRootComp: HeaderRootComp): void;
    private init();
    /** Used internally by grid. Not intended to be used by the client. Interface may change between releases. */
    __getAlignedGridService(): AlignedGridsService;
    addDetailGridInfo(id: string, gridInfo: DetailGridInfo): void;
    removeDetailGridInfo(id: string): void;
    getDetailGridInfo(id: string): DetailGridInfo;
    forEachDetailGridInfo(callback: (gridInfo: DetailGridInfo, index: number) => void): void;
    getDataAsCsv(params?: CsvExportParams): string;
    exportDataAsCsv(params?: CsvExportParams): void;
    getDataAsExcel(params?: ExcelExportParams): string;
    exportDataAsExcel(params?: ExcelExportParams): void;
    setEnterpriseDatasource(datasource: IServerSideDatasource): void;
    setServerSideDatasource(datasource: IServerSideDatasource): void;
    setDatasource(datasource: IDatasource): void;
    setViewportDatasource(viewportDatasource: IViewportDatasource): void;
    setRowData(rowData: any[]): void;
    setFloatingTopRowData(rows: any[]): void;
    setFloatingBottomRowData(rows: any[]): void;
    getFloatingTopRowCount(): number;
    getFloatingBottomRowCount(): number;
    getFloatingTopRow(index: number): RowNode;
    getFloatingBottomRow(index: number): RowNode;
    setPinnedTopRowData(rows: any[]): void;
    setPinnedBottomRowData(rows: any[]): void;
    getPinnedTopRowCount(): number;
    getPinnedBottomRowCount(): number;
    getPinnedTopRow(index: number): RowNode;
    getPinnedBottomRow(index: number): RowNode;
    setColumnDefs(colDefs: (ColDef | ColGroupDef)[], source?: ColumnEventType): void;
    expireValueCache(): void;
    getVerticalPixelRange(): any;
    refreshToolPanel(): void;
    refreshCells(params?: RefreshCellsParams): void;
    flashCells(params?: FlashCellsParams): void;
    redrawRows(params?: RedrawRowsParams): void;
    timeFullRedraw(count?: number): void;
    refreshView(): void;
    refreshRows(rowNodes: RowNode[]): void;
    rowDataChanged(rows: any): void;
    softRefreshView(): void;
    refreshGroupRows(): void;
    setFunctionsReadOnly(readOnly: boolean): void;
    refreshHeader(): void;
    isAnyFilterPresent(): boolean;
    isAdvancedFilterPresent(): boolean;
    isQuickFilterPresent(): boolean;
    getModel(): IRowModel;
    onGroupExpandedOrCollapsed(deprecated_refreshFromIndex?: any): void;
    refreshInMemoryRowModel(step?: string): any;
    refreshClientSideRowModel(step?: string): any;
    isAnimationFrameQueueEmpty(): boolean;
    getRowNode(id: string): RowNode;
    expandAll(): void;
    collapseAll(): void;
    addVirtualRowListener(eventName: string, rowIndex: number, callback: Function): void;
    addRenderedRowListener(eventName: string, rowIndex: number, callback: Function): void;
    setQuickFilter(newFilter: any): void;
    selectIndex(index: any, tryMulti: any, suppressEvents: any): void;
    deselectIndex(index: number, suppressEvents?: boolean): void;
    selectNode(node: RowNode, tryMulti?: boolean, suppressEvents?: boolean): void;
    deselectNode(node: RowNode, suppressEvents?: boolean): void;
    selectAll(): void;
    deselectAll(): void;
    selectAllFiltered(): void;
    deselectAllFiltered(): void;
    recomputeAggregates(): void;
    sizeColumnsToFit(): void;
    showLoadingOverlay(): void;
    showNoRowsOverlay(): void;
    hideOverlay(): void;
    isNodeSelected(node: any): any;
    getSelectedNodesById(): {
        [nodeId: number]: RowNode;
    };
    getSelectedNodes(): RowNode[];
    getSelectedRows(): any[];
    getBestCostNodeSelection(): any;
    getRenderedNodes(): RowNode[];
    ensureColIndexVisible(index: any): void;
    ensureColumnVisible(key: string | Column): void;
    ensureIndexVisible(index: any, position?: string): void;
    ensureNodeVisible(comparator: any, position?: string): void;
    forEachLeafNode(callback: (rowNode: RowNode) => void): void;
    forEachNode(callback: (rowNode: RowNode) => void): void;
    forEachNodeAfterFilter(callback: (rowNode: RowNode) => void): void;
    forEachNodeAfterFilterAndSort(callback: (rowNode: RowNode) => void): void;
    getFilterApiForColDef(colDef: any): any;
    getFilterInstance(key: string | Column): IFilterComp;
    getFilterApi(key: string | Column): IFilterComp;
    destroyFilter(key: string | Column): void;
    getColumnDef(key: string | Column): ColDef;
    onFilterChanged(): void;
    onSortChanged(): void;
    setSortModel(sortModel: any, source?: ColumnEventType): void;
    getSortModel(): {
        colId: string;
        sort: string;
    }[];
    setFilterModel(model: any): void;
    getFilterModel(): any;
    getFocusedCell(): GridCell;
    clearFocusedCell(): void;
    setFocusedCell(rowIndex: number, colKey: string | Column, floating?: string): void;
    setSuppressRowDrag(value: boolean): void;
    setHeaderHeight(headerHeight: number): void;
    setGridAutoHeight(gridAutoHeight: boolean): void;
    getPreferredWidth(): number;
    setGroupHeaderHeight(headerHeight: number): void;
    setFloatingFiltersHeight(headerHeight: number): void;
    setPivotGroupHeaderHeight(headerHeight: number): void;
    setPivotHeaderHeight(headerHeight: number): void;
    showToolPanel(show: any): void;
    setSuppressClipboardPaste(value: boolean): void;
    isToolPanelShowing(): boolean;
    doLayout(): void;
    resetRowHeights(): void;
    setGroupRemoveSingleChildren(value: boolean): void;
    setGroupRemoveLowestSingleChildren(value: boolean): void;
    onRowHeightChanged(): void;
    getValue(colKey: string | Column, rowNode: RowNode): any;
    addEventListener(eventType: string, listener: Function): void;
    addGlobalListener(listener: Function): void;
    removeEventListener(eventType: string, listener: Function): void;
    removeGlobalListener(listener: Function): void;
    dispatchEvent(event: AgEvent): void;
    destroy(): void;
    resetQuickFilter(): void;
    getRangeSelections(): RangeSelection[];
    camelCaseToHumanReadable(camelCase: string): string;
    addRangeSelection(rangeSelection: AddRangeSelectionParams): void;
    clearRangeSelection(): void;
    copySelectedRowsToClipboard(includeHeader: boolean, columnKeys?: (string | Column)[]): void;
    copySelectedRangeToClipboard(includeHeader: boolean): void;
    copySelectedRangeDown(): void;
    showColumnMenuAfterButtonClick(colKey: string | Column, buttonElement: HTMLElement): void;
    showColumnMenuAfterMouseClick(colKey: string | Column, mouseEvent: MouseEvent | Touch): void;
    hidePopupMenu(): void;
    setPopupParent(ePopupParent: HTMLElement): void;
    tabToNextCell(): boolean;
    tabToPreviousCell(): boolean;
    getCellRendererInstances(params?: GetCellRendererInstancesParams): ICellRendererComp[];
    getCellEditorInstances(params?: GetCellEditorInstancesParams): ICellEditorComp[];
    getEditingCells(): GridCellDef[];
    stopEditing(cancel?: boolean): void;
    startEditingCell(params: StartEditingCellParams): void;
    addAggFunc(key: string, aggFunc: IAggFunc): void;
    addAggFuncs(aggFuncs: {
        [key: string]: IAggFunc;
    }): void;
    clearAggFuncs(): void;
    updateRowData(rowDataTransaction: RowDataTransaction): RowNodeTransaction;
    batchUpdateRowData(rowDataTransaction: RowDataTransaction, callback?: (res: RowNodeTransaction) => void): void;
    insertItemsAtIndex(index: number, items: any[], skipRefresh?: boolean): void;
    removeItems(rowNodes: RowNode[], skipRefresh?: boolean): void;
    addItems(items: any[], skipRefresh?: boolean): void;
    refreshVirtualPageCache(): void;
    refreshInfinitePageCache(): void;
    refreshInfiniteCache(): void;
    purgeVirtualPageCache(): void;
    purgeInfinitePageCache(): void;
    purgeInfiniteCache(): void;
    purgeEnterpriseCache(route?: string[]): void;
    purgeServerSideCache(route?: string[]): void;
    getVirtualRowCount(): number;
    getInfiniteRowCount(): number;
    isMaxRowFound(): boolean;
    setVirtualRowCount(rowCount: number, maxRowFound?: boolean): void;
    setInfiniteRowCount(rowCount: number, maxRowFound?: boolean): void;
    getVirtualPageState(): any;
    getInfinitePageState(): any;
    getCacheBlockState(): any;
    checkGridSize(): void;
    getFirstRenderedRow(): number;
    getFirstDisplayedRow(): number;
    getLastRenderedRow(): number;
    getLastDisplayedRow(): number;
    getDisplayedRowAtIndex(index: number): RowNode;
    getDisplayedRowCount(): number;
    paginationIsLastPageFound(): boolean;
    paginationGetPageSize(): number;
    paginationSetPageSize(size: number): void;
    paginationGetCurrentPage(): number;
    paginationGetTotalPages(): number;
    paginationGetRowCount(): number;
    paginationGoToNextPage(): void;
    paginationGoToPreviousPage(): void;
    paginationGoToFirstPage(): void;
    paginationGoToLastPage(): void;
    paginationGoToPage(page: number): void;
}
