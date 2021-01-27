import { Request, Response, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import validationMiddleware from "../middleware/validation.middleware";
import NotFoundException from "../exceptions/NotFoundException";
import checkMongoId from "../middleware/checkMongoId.middleware";
import CreateKanjiDto from "./kanji.dto";
import { KanjiService } from "./kanji.service";

class KanjiController implements Controller {
    public path = "/kanji";
    public router = Router();
    public kanjiService: KanjiService;

    constructor() {
        this.kanjiService = new KanjiService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllKanji);
        this.router.get(`${this.path}/popular`, this.getPopularKanji);
        this.router.get(`${this.path}/find/:name`, this.getKanjiByName);
        this.router.get(`${this.path}/:grade`, this.getKanjiByGrade);
        this.router
            .all(`${this.path}/*`)
            .post(this.path, validationMiddleware(CreateKanjiDto), this.createKanji);
    }

    private getAllKanji = async (request: Request, response: Response) => {
        const kanjis = await this.kanjiService.getAllKanji();
        response.send(kanjis);
    };

    private getKanjiByName = async(request: Request, response: Response) => {
        const name : string = request.params.name;
        const kanji = await this.kanjiService.getKanjiByName(name);
        if(typeof kanji === 'object' && kanji !== null) {
        await this.kanjiService.updateKanjiView(kanji._id);
        }
        response.send(kanji);
    }

    private getPopularKanji = async(request: Request, response: Response) => {
        const kanjis = await this.kanjiService.getPopularKanji();
        response.send(kanjis);
    }

    private getKanjiByGrade = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        const grade: number = parseInt(request.params.grade);
        const kanji = await this.kanjiService.getRandomKanjiByGrade(grade);
        if (kanji) {
            response.send(kanji);
        } else {
            next(new NotFoundException(`Kanji with grade ${grade} not found`));
        }
    };

    private createKanji = async (request: Request, response: Response) => {
        const savedKanji = await this.kanjiService.createKanji(request.body);
        response.send(savedKanji);
    };

}

export default KanjiController;
