const githubIssues = {
  qInfo: {
    qType: "table"
  },
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ["title"],
          qLabel: "Title",
          qSortCriterias: [
            {
              qSortByNumeric: 1
            }
          ]
        }
      },
      {
        qDef: {
          qFieldDefs: ["repo"],
          qLabel: "Repo",
          qSortCriterias: [
            {
              qSortByNumeric: 1
            }
          ]
        }
      },
      {
        qDef: {
          qFieldDefs: ["date"],
          qLabel: "Date",
          qSortCriterias: [
            {
              qSortByNumeric: 1
            }
          ]
        }
      },
      {
        qDef: {
          qFieldDefs: ["iscorerepo"],
          qLabel: "Is a core repo",
          qSortCriterias: [
            {
              qSortByNumeric: 1
            }
          ]
        }
      },
      {
        qDef: {
          qFieldDefs: ["usertype"],
          qLabel: "User",
          qSortCriterias: [
            {
              qSortByNumeric: 1
            }
          ]
        }
      },
    ],
    qInterColumnSortOrder: [3, 0],
    qInitialDataFetch: [
      {
        qTop: 0,
        qHeight: 15,
        qLeft: 0,
        qWidth: 17
      }
    ],
    qSuppressMissing: true,
    qSuppressZero: true
  }
};


export {
  githubIssues
};
