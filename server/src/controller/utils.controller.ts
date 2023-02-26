import { ModelStatic } from "sequelize";
import { Model } from "sequelize-typescript";

/**
 * Throws error if given item id does not exist or isn't valid
 * @param id Role id to check
 */
export async function checkExistingId<M extends Model>(
    id: number,
    model: ModelStatic<M>
) {
    // Check is id is a number
    if (Number.isNaN(id)) throw new Error("Giver id is Not A Number");

    // Check if requested role id exist in database
    const existingPoste = await model.findByPk(id);
    if (existingPoste === null)
        throw new Error("Wrong id or item doesn't exist");
}
