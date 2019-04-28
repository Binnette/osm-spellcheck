export class OsmService {

    private isDev = true;
    private apiUrl = {
        prod: { 
            'api': 'https://api.openstreetmap.org',
            'overpass': 'https://overpass-api.de/api/interpreter'
        },
        dev: {
            'api': 'https://master.apis.dev.openstreetmap.org',
            'overpass': ''
        }
    };

    constructor(
        private appName: string,
        private appVersion: string,
        private username: string,
        private password: string,
    ){

    }

    private apiMethod = {
        'createChangeset': '/api/0.6/changeset/create',

    }

    private getUrlApi() {
        return this.isDev ? this.apiUrl.dev.api : this.apiUrl.prod.api
    }

    // TODO change param from string to "node"
    public FixNodesSpelling(nodes: Array<string>, comment: string) : boolean {
        //get user info
        
        //create a changeset

        //add nodes updates to changeset

        //close changeset

        //push changeset to server
    
        return true;
    }

    private createChangeset(comment: string) : string {
        const url: string = this.getUrlApi() + this.apiMethod.createChangeset;
        const appLabel: string = this.appName + ' ' + this.appVersion; 
        const host: string = location.origin;
        const body = 
        `<osm>
            <changeset>
                <tag k="created_by" v="${appLabel}" />
                <tag k="comment" v="${comment}" />
                <tag k="host" v="${host}" />
            </changeset>
        </osm>`;

        

        return 'changeset';
    }
}