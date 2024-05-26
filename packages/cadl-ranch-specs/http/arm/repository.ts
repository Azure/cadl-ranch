export class ResourceRepository {
  private resources: Record<string, Resource> = {};

  public get(resourceId: string) {
    resourceId = resourceId.toLowerCase();
    return this.resources[resourceId];
  }

  public put(resourceId: string, resourceName: string, resource: Resource): Resource {
    resource.id = resourceId;
    resource.type = "dummy";
    resource.name = resourceName;
    resource.systemData = {
      createdBy: "AzureSDK",
      createdByType: "User",
      createdAt: new Date(),
      lastModifiedBy: "AzureSDK",
      lastModifiedAt: new Date(),
      lastModifiedByType: "User",
    };
    resource.properties = {
      ...resource.properties,
      provisioningState: "Succeeded",
    };
    resourceId = resourceId.toLowerCase();
    this.resources[resourceId] = resource;
    return resource;
  }

  public listByResourceGroup(scope: string) {
    return this.filter(scope, (s, id) => id.toLowerCase().startsWith(s.toLowerCase()));
  }

  public listBySubscription(scope: string) {
    return this.filter(scope, (s, id) => id.toLowerCase().replace(/resourcegroups\/[a-z|A-Z|1-9|\-|_]+\//i, "").startsWith(s.toLowerCase()));
  }

  private filter(scope: string, matchFunc: (toFilter: string, resourceId: string) => boolean) {
    return {
      value: Object.entries(this.resources)
      .map(([, v])=> v)
      .filter(resource => matchFunc(scope, resource.id))
      .sort((a, b) => {
        const createdAtA = a.systemData.createdAt;
        const createdAtB = b.systemData.createdAt;
        if (createdAtA < createdAtB) return -1;
        else if (createdAtA > createdAtB) return 1;
        else return 0;
      })
    }
  }

  public delete(resourceId: string) {
    const remains: Record<string, Resource>  = {};
    resourceId = resourceId.toLowerCase();
    Object.keys(this.resources).forEach(key => {
      if (resourceId !== key.toLowerCase()) {
        remains[resourceId] = this.resources[resourceId];
      }
    })
    this.resources = remains;
  }
}

export interface Resource {
  id: string;
  name: string;
  type: string;
  systemData: SystemData;
  properties?: object;
}

export interface SystemData {
  createdBy: string;
  createdByType: string;
  createdAt: Date;
  lastModifiedBy: string;
  lastModifiedByType: string;
  lastModifiedAt: Date;
}
