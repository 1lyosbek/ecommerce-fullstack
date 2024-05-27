import { connectionSource } from "src/common/config/database.config";
import { RoleEnum } from "src/common/enums/enums";
import { hashed } from "src/lib/bcrypt";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { createConnection, DataSource } from "typeorm"



(async () => {
    const connection: DataSource = await createConnection(connectionSource);

    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

        ////////Creating User///////

        const userRepository = queryRunner.manager.getRepository(UserEntity);
        const users = await userRepository.find();
        await userRepository.remove(users);
        const newUser = new UserEntity();
        newUser.FirstName = "Boburmirzo";
        newUser.LastName = "Asadov"
        newUser.UserName = "boburmirzo";
        newUser.phones = ["+998335701001"];
        newUser.role = RoleEnum.OWNER;
        newUser.password = await hashed("12345677b");
        newUser.isActive = true;
        await userRepository.save<UserEntity>(newUser);
        await queryRunner.commitTransaction();
    } catch (err) {
        console.log("error", err);
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
})();
