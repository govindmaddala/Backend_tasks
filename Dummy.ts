this.eamsData = []
this.nonEamsData = []
this.eamsTabledata = []
this.nonEamsTabledata = []

this.tabledata = []

this.usersoftwareservice.GetSoftwareList(reqdata).subscribe((data: any[]) => {
  try {
    this.spinner.hide();
    this.eamsData = data;
    this.eamsTabledata = this.eamsData.totallist.sort((a, b) => b.id - a.id);
    this.eamsTabledata = this.eamsTabledata.filter(
      (thing, i, arr) => arr.findIndex(t => t.requestUMSId === thing.requestUMSId) === i
    );

    if (this.roleid == RoleIds.SuperAdminDev || this.roleid == RoleIds.SuperAdminQA || this.roleid == RoleIds.GlandSuperAdminDev || this.roleid == RoleIds.GlandSuperAdminQA) {
      if (this.orgID == organisation.orgname) {
        this.eamsTabledata = this.eamsTabledata.filter(x => x.workFlowId == 2);
      }
      else {
        this.eamsTabledata = this.eamsTabledata.filter(x => x.workFlowId == 1);
      }
    }
    else if (this.plantid == null) {
      if (this.orgID == organisation.orgname) {
        this.eamsTabledata = this.eamsTabledata.filter(x => x.plantId == this.plnId && x.workFlowId == 2);
      }
      else {
        this.eamsTabledata = this.eamsTabledata.filter(x => x.plantId == this.plnId && x.workFlowId == 1);
      }
    }
    else {
      if (this.orgID == organisation.orgname) {
        this.eamsTabledata = this.eamsTabledata.filter(x => x.workFlowId == 2);
      }
      else {
        this.eamsTabledata = this.eamsTabledata.filter(x => x.workFlowId == 1);
      }
    }
    this.tableflag = true;
    this.tabledata = this.eamsTabledata
  }
  catch (error) {
    console.error(error);
  }
  this.dtTrigger.next();
});
this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => { dtInstance.destroy(); });

//Non-Eams

this.usersoftwareservice.GetSoftwareListNONEAMS(reqdata).subscribe((data: any[]) => {
    try {
      this.spinner.hide();
      this.nonEamsData = data;
      this.nonEamsTabledata = this.nonEamsData.totallist.sort((a, b) => b.id - a.id);
      this.nonEamsTabledata = this.nonEamsTabledata.filter(
        (thing, i, arr) => arr.findIndex(t => t.requestUMSId === thing.requestUMSId) === i
      );
  
      if (this.roleid == RoleIds.SuperAdminDev || this.roleid == RoleIds.SuperAdminQA || this.roleid == RoleIds.GlandSuperAdminDev || this.roleid == RoleIds.GlandSuperAdminQA) {
        if (this.orgID == organisation.orgname) {
          this.nonEamsTabledata = this.nonEamsTabledata.filter(x => x.workFlowId == 2);
        }
        else {
          this.nonEamsTabledata = this.nonEamsTabledata.filter(x => x.workFlowId == 1);
        }
      }
      else if (this.plantid == null) {
        if (this.orgID == organisation.orgname) {
          this.nonEamsTabledata = this.nonEamsTabledata.filter(x => x.plantId == this.plnId && x.workFlowId == 2);
        }
        else {
          this.nonEamsTabledata = this.nonEamsTabledata.filter(x => x.plantId == this.plnId && x.workFlowId == 1);
        }
      }
      else {
        if (this.orgID == organisation.orgname) {
          this.nonEamsTabledata = this.nonEamsTabledata.filter(x => x.workFlowId == 2);
        }
        else {
          this.nonEamsTabledata = this.nonEamsTabledata.filter(x => x.workFlowId == 1);
        }
      }
      this.tableflag = true;
    }
    catch (error) {
      console.error(error);
    }
    this.dtTrigger.next();
  });
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => { dtInstance.destroy(); });

this.tabledata = [...this.eamsTabledata, ...this.nonEamsTabledata]

