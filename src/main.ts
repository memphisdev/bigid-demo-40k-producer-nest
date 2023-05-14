import { memphis, Memphis } from 'memphis-dev';

async function startProducer() {
  let memphisConnection: Memphis;

  try {
    memphisConnection = await memphis.connect({
      host: process.env.MEMPHIS_HOST,
      username: process.env.MEMPHIS_USERNAME,
      connectionToken: process.env.PASS,
    });
    const producer = await memphisConnection.producer({
      stationName: 'demo-40k',
      producerName: 'producer',
    });

    for (let index = 0; index < 40000; index++) {
      await producer.produce({
        message: Buffer.from(`Message #${index}: Hello world`), // you can also send JS object - {}
      });
      console.log('Message sent');
    }

    console.log('All messages sent');
    memphisConnection.close();
  } catch (ex) {
    console.log(ex);
    if (memphisConnection) memphisConnection.close();
  }
}
startProducer();
