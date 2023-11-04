import { serverManager } from '../managers/server';
import { logger } from '../helpers/logger';
import Endpoint from '../helpers/endpoint';
import { DbResult } from '../database.types';

export default (): void => {
  serverManager.socket.on('connection', (s) => {
    s.on('disconnect', () => {
      logger.info('Socket disconnected');
    });
  });

  Endpoint.Post(serverManager.v1, '/test-write', false, async (req) => {
    const message = String(req.body.message);

    await serverManager.supabase
      .from('test')
      .insert([{ message: message }])
      .then((res) => {
        if (res.error) {
          logger.error(res.error);
        }
      });

    /*
      curl -X POST \
      -H "Content-Type: application/json" \
      -d '{"message":"test"}' \
      http://localhost:4000/api/v1/test-write
    */

    return {
      data: {
        name: req.body.name || 'Empty',
      },
    };
  });

  Endpoint.Get(serverManager.v1, '/test-read', false, async (req) => {
    const query = serverManager.supabase.from('movies').select('id, title, data');
    const movies: DbResult<typeof query> = await query;

    /*
      curl -X GET \
      http://localhost:4000/api/v1/test-read
    */

    return {
      data: movies.data,
    };
  });

  logger.loadedController('test');
};
