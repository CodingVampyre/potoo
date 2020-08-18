import {v1 as uuid} from 'uuid';
import { ENOTTY } from 'constants';

interface IStorageEntity {
    id: string;
    file: string;
    tags: string[];
}

interface IInsertParams {
    file: string;
    tags: string[];
}

interface IInsertResult {
    id: string;
}

interface IRetrieveResult {
    file: string;
    tags: string[];
}

/** Handles Storing from Images In Memo as long as there is no real db */
export class Storage {

    /** entity object */
    private entities: IStorageEntity[] = [];

    /**
     * 
     * @param params 
     */
    public store(params: IInsertParams): IInsertResult {
        const id = uuid();
        this.entities.push({ id, file: params.file, tags: params.tags });
        return { id };
    }

    /**
     * 
     */
    public retrieveAll(): IRetrieveResult[] {
        return this.entities.map(entity => { return {file: entity.file, tags: entity.tags} });
    }

    /**
     * 
     * @param id 
     */
    public retrieveById(id: string): IRetrieveResult | undefined {
        for (const entity of this.entities) {
            if (entity.id === id) { 
                return { file: entity.file, tags: entity.tags, } 
            }
        }
    }

    /**
     * 
     * @param tag 
     */
    public retrieveByTag(tag: string): IRetrieveResult[] {
        const results = [];
        for (const entity of this.entities) {
            for (const entityTag of entity.tags) {
                if (tag === entityTag) { 
                    results.push({ file: entity.file, tags: entity.tags, });
                    break;
                }
            }
        }
        return results;
    }
}