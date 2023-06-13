import { Component } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { TreeDataSource } from './tree-datasource';
import { EditNameDialogComponent } from './edit-name-dialog/edit-name-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OrganogramaService } from '../organograma.service';
import { Organograma } from 'src/app/models/organograma.interface';




@Component({
  selector: 'app-tree-organograma',
  templateUrl: './tree-organograma.component.html',
  styleUrls: ['./tree-organograma.component.css']
})
export class TreeOrganogramaComponent {
  TREE_DATA: Organograma[];
  nodes : Organograma[];
  treeControl : any;
  dataSource : any;
  exibir : boolean = false;
  newid : number = 0;
  

  constructor(private dialog: MatDialog, private service: OrganogramaService) {
      this.TREE_DATA = service.getTreeData();
      console.log("treecomponent: "+ JSON.stringify(this.TREE_DATA));
      this.treeControl = new NestedTreeControl<Organograma>(node => node.children);
      this.dataSource = new TreeDataSource(this.treeControl, this.TREE_DATA);
      this.nodes = this.TREE_DATA;
  }

  
  hasChild = (_: number, node: Organograma) =>
    !!node.children && node.children.length > 0;

  addNew(parentNode: Organograma) {
    this.dataSource.add({ name: "New"+this.newid++, empresa: { id: 1} }, parentNode);
  }

  editName(node: Organograma) {
    const dialogRef = this.dialog.open(EditNameDialogComponent, {
      width: '300px',
      data: { name: node.name }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const nodeIndex = this.nodes.indexOf(node);
        let indexFind = this.getNodeIndex(node.name, this.nodes, [])
        this.modifyNode(indexFind, result);
      }
    });
  }
  
  remove(node: Organograma) {
    this.dataSource.remove(node);
  }


  getNodeIndex(nodeName: string, treeData: Organograma[], path: number[] = []): number[] {
    for (let i = 0; i < treeData.length; i++) {
      const currentNode = treeData[i];
      if (currentNode.name === nodeName) {
        return [...path, i];
      }
      if (currentNode.children) {
        const result = this.getNodeIndex(nodeName, currentNode.children, [...path, i]);
        if (result.length) {
          return result;
        }
      }
    }
    return [];
  }

  modifyNode(indexArray: number[], newName: string) {
    let nodes = this.TREE_DATA;
    let node;
    for (let i = 0; i < indexArray.length; i++) {
      node = nodes[indexArray[i]];
      if (i === indexArray.length - 1) {
        node.name = newName;
      } else {
        nodes = node.children!;
      }
    }
  }

  save(){
    console.log(this.TREE_DATA.at(0));
    this.service.insertData(this.TREE_DATA.at(0)).subscribe({
      next: (n) => console.log(n),
      error: (e) => console.error(e)
    });
  }
}
