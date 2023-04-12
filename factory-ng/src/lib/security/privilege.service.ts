import { Injectable } from "@angular/core";
import { Privilege } from "./privilege.model";


@Injectable({
  providedIn: "root",
})
export class PrivilegeService {
    
  constructor() { }


  clearPrivileges() {
    sessionStorage.removeItem("userPrivileges");
  }


  getPrivileges() {
    return JSON.parse(sessionStorage.getItem("userPrivileges"));
  }


  isPrivilegeValid(privilege: string): boolean {
    let splitOfAction = privilege.split(".");
    let privilegeValid = new Privilege(
      splitOfAction[0],
      splitOfAction[1],
      splitOfAction[2]
    );
    return this.isValid(privilegeValid);
  }


  private isValid(privilegeValid: Privilege): boolean {
    let privileges = this.getPrivileges();
    if(privileges){
      return (
        privileges.filter(
          (a : Privilege) =>
            (a.module == privilegeValid.module || "*" == privilegeValid.module) &&
            (a.entity == privilegeValid.entity || "*" == privilegeValid.entity) &&
            (a.eventName == privilegeValid.eventName || "*" == privilegeValid.eventName)
        ).length > 0
      );
    }
    return false;
  }


  savePrivileges(data: any) {
    sessionStorage.setItem("userPrivileges", JSON.stringify(data));
  }

}