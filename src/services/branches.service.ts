import { CreateBranchDto, UpdateBranchDto } from '@dtos/branches.dto';
import { HttpException, Errors } from '@shared/HttpException';
import { isObjectEmpty } from '@shared/utils';

export class BranchService {
    async getBranches(): Promise<any> {
        const branches = "await BranchEntity.find();"

        return branches;
    }

    async createBranch(body: CreateBranchDto): Promise<any> {
        // const [branch]\ = await BranchEntity.findBy({ branchName: body.branchName });

        // if (branch) {
        //     throw new HttpException(400, Errors.BRANCH_ALREADY_EXISTS, 'Bunday filial mavjud!');
        // }

        // const newBranch = await BranchEntity.create({ branchName: body.branchName }).save();

        return "newBranch";
    }

    async updateBranch(params: { id?: string }, body: Partial<UpdateBranchDto>): Promise<any> {
        // if (isObjectEmpty(params) && !params.id) {
        //     throw new HttpException(400, Errors.BAD_REQUEST_ERROR, 'ID kiritish majburiy!');
        // }

        // const branch = await BranchEntity.find();

        // const rea = branch.filter(el => el.id == params.id);

        // if (!rea.length) {
        //     throw new HttpException(404, Errors.BRANCH_NOT_FOUND, 'Bunday filial topilmadi!');
        // }

        // const [checkBranchName] = await BranchEntity.findBy({ branchName: body.branchName });

        // if (checkBranchName) {
        //     throw new HttpException(403, Errors.BRANCH_ALREADY_EXISTS, 'Bunday filial mavjud!');
        // }

        // const editedBranch = await BranchEntity.save({ id: params.id, ...body });

        return "editedBranch";
    }
}
