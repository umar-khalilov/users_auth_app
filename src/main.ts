import { App } from './App';
import { AppClusterService } from './app/app-clusterize.service';

const main = async (): Promise<void> => {
    const app = await App.initialize();
    await app.listen();
};

AppClusterService.runInCluster(main);
