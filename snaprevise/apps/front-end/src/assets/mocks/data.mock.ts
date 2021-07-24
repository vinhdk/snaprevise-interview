import { IPaper } from '../../app/interfaces';

export const data: IPaper[] = [
  {
    id: '8701',
    title: 'Past Paper by Topic',
    position: 0,
    modules: [
      {
        id: '8702',
        title: 'update again here',
        position: 0,
        paper: {
          id: '8701',
          title: 'Past Paper by Topic',
          position: 0,
          modules: []
        },
        topics: [
          {
            id: '8703',
            title: 'topic - upload asdasd',
            position: 0,
            module: {
              id: '8702',
              title: 'update again here',
              position: 0,
              paper: {
                id: '8701',
                title: 'Past Paper by Topic',
                position: 0,
                modules: []
              },
              topics: []
            },
            questions: []
          },
        ]
      },
      {
        id: '8708',
        title: 'Photosynthesis',
        position: 1,
        paper: {
          id: '8701',
          title: 'Past Paper by Topic',
          position: 0,
          modules: []
        },
        topics: [
          {
            id: '8709',
            title: 'topic 2',
            position: 0,
            module: {
              id: '8708',
              title: 'Photosynthesis',
              position: 1,
              paper: {
                id: '8701',
                title: 'Past Paper by Topic',
                position: 0,
                modules: []
              },
              topics: []
            },
            questions: [
              {
                id: '8713',
                title: 'question 2-2',
                position: 0,
                topic: {
                  id: '8709',
                  title: 'topic 2',
                  position: 0,
                  module: {
                    id: '8708',
                    title: 'Photosynthesis',
                    position: 1,
                    paper: {
                      id: '8701',
                      title: 'Past Paper by Topic',
                      position: 0,
                      modules: []
                    },
                    topics: []
                  },
                  questions: []
                },
              }
            ]
          },
          {
            id: '8710',
            title: 'topic 3',
            position: 1,
            module: {
              id: '8708',
              title: 'Photosynthesis',
              position: 1,
              paper: {
                id: '8701',
                title: 'Past Paper by Topic',
                position: 0,
                modules: []
              },
              topics: []
            },
            questions: []
          },
        ]
      }
    ]
  }
];
