import { AngularFireDatabase, AngularFireObject, AngularFireList } from "angularfire2/database";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class ProjectFirebaseService {

    constructor(
        private af: AngularFireDatabase) { }

    updateProject(projectId, newValue): void {
        //console.log(newValue);
        this.getProject(projectId)
            .set(newValue);   
    }

    getProject(projectId): AngularFireObject<number> {
        return this.af.object('/projectsLikes/' + projectId);
    }

    getProjectList(): AngularFireList<number[]> {
        return this.af.list('/projectsLikes');
    }

    getRefList() {
        return this.af.database.ref('projectsLikes');
    }

    getLikesCount(projectId): Observable<number> {
        return this.getProject(projectId).valueChanges().pipe(
          map(likes => {
            return likes;
          })
        );
    }
}