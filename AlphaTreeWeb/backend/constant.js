(function () {
    "use strict";
    window.McliB = window.McliB || {};    //MDS Support: Type.registerNamespace("ag2rlm");
    McliB.Constants = McliB.Constants || {};
    var orderFucusFields = {
        Title: "Title",
        Urlpageactu: "Urlpageactu",
        Ordrefocus: "Ordrefocus",
        Audience: "Audience"
    }
    var AssetsPath = "/_catalogs/masterpage/Ag2rlamondiale/Assets/";
    var RelatifPathAsset = ".." + AssetsPath;
    var jsCompentnBase = "js/components/";
    var relatifJsCompenentPath = AssetsPath + jsCompentnBase;
    var jsComponents = RelatifPathAsset + jsCompentnBase;
    var toasterConfigtimeOut = 4000;
    var plugins = ['checkbox', 'types', 'sort'];
    var coreTree = {
        multiple: true,
        animation: true,
        error: function (error) {
            // $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
        },
        themes: { 'dots': false },
        check_callback: true,
        worker: true,
    }
    var listeActuUrl = "./liste-actu.aspx";
    var listeActuProxiUrl = "./liste-actu-proxi.aspx"
    var AllRegions = "Toutes les régions";


    var messageloading = "Chargement en cours ...",
        loadingTemplateBase = '<div class="row"><div class="col-md-2 col-md-offset-5"><div id="toast-container2" class="toast-top-right"><div class="toast ng-scope toast-wait"><div ng-class="config.title" class="ng-binding toast-title"></div><div ng-class="config.message" ng-switch="" on="toaster.bodyOutputType" class="toast-message"><div>{{message}}</div></div></div></div></div></div>',
        successTemplateBase = '<div class="row"><div class="col-md-2 col-md-offset-5"><div id="toast-container2" class="toast-top-right"><div class="toast ng-scope toast-success"><div ng-class="config.title" class="ng-binding toast-title"></div><div ng-class="config.message" ng-switch="" on="toaster.bodyOutputType" class="toast-message"><div>{{message}}</div></div></div></div></div></div>';
        McliB.Constants =
        {
            //webUrl: "https://siii.sharepoint.com/sites/declics13",
            jsCompentnBase: jsCompentnBase,
            listeActuProxiUrl: listeActuProxiUrl,
            DeleteConfirmationMessage: "Êtes-vous sûr de vouloir supprimer cet élément ?",
            errorMessage: "une erreur s'est produite veuillez réessayer ultérieurement",
            sucessMessage: "Succès",
            cgBusyDefaults: {
                message: 'Chargement en cours',
                backdrop: true,
                templateUrl: 'angular-busy.html',
                delay: 10,
                minDuration: 0,
                wrapperClass: 'my-class my-class2'
            },
            cgBusyDefaultsLoading: {
                message: 'Chargement en cours',
                backdrop: true,
                templateUrl: 'angular-busy-loading.html',
                delay: 10,
                minDuration: 0,
                wrapperClass: 'my-class my-class2'
            },
            messageloading: messageloading,
            loadingTemplateBase: loadingTemplateBase,
            loadingTemplate: loadingTemplateBase.replace("{{message}}", messageloading),
            successTemplateBase: successTemplateBase,
            toasterConfig: {
                'limit': 0,               // limits max number of toasts
                'tap-to-dismiss': true,
                'close-button': false,
                'close-html': '<button class="toast-close-button" type="button">&times;</button>',
                'newest-on-top': true,
                'time-out': {
                    'toast-error': toasterConfigtimeOut,
                    'toast-info': toasterConfigtimeOut,
                    'toast-wait': 0,
                    'toast-success': toasterConfigtimeOut,
                    'toast-warning': toasterConfigtimeOut
                },
                'icon-classes': {
                    error: 'toast-error',
                    info: 'toast-info',
                    wait: 'toast-wait',
                    success: 'toast-success',
                    warning: 'toast-warning'
                },
                'body-output-type': '', // Options: '', 'trustedHtml', 'template', 'templateWithData', 'directive'
                'body-template': 'toasterBodyTmpl.html',
                'icon-class': 'toast-info',
                'position-class': 'toast-top-right', // Options (see CSS):
                // 'toast-top-full-width', 'toast-bottom-full-width', 'toast-center',
                // 'toast-top-left', 'toast-top-center', 'toast-top-right',
                // 'toast-bottom-left', 'toast-bottom-center', 'toast-bottom-right',
                'title-class': 'toast-title',
                'message-class': 'toast-message',
                'prevent-duplicates': false,
                'mouseover-timer-stop': true // stop timeout on mouseover and restart timer on mouseout
            },
            AllRegions: AllRegions,
            RelatifPathAsset: RelatifPathAsset,
            RelatifPathAngular15: "",//jsComponents,
            RelatifPathSubSiteAngular15: "",// "../" + jsComponents,
            QueryTemplate: "<View{Options}>{ViewFields}{RowLimit}<Query>{Where}{OrderBy}</Query></View>",
            Search: {
                EmptyText: "NOT(xx:a* OR xx:b* OR xx:c* OR xx:d* OR xx:e* OR xx:f* OR xx:g* OR xx:h* OR xx:i* OR xx:j* OR xx:k* OR xx:l* OR xx:m* OR xx:n* OR xx:o* OR xx:p* OR xx:q* OR xx:r* OR xx:s* OR xx:t* OR xx:u* OR xx:v* OR xx:w* OR xx:x* OR xx:y* OR xx:z* OR xx:1* OR xx:2* OR xx:3* OR xx:4* OR xx:5* OR xx:6* OR xx:7* OR xx:8* OR xx:9* OR xx:0*)"
            },
            StandardField: {
                ContentType: "ContentType",
                ContentTypeId: "ContentTypeId",
                Modified: "Modified",
                Title: "Title",
                FileLeafRef: "FileLeafRef",
                FileRef: "FileRef",
                Id: "Id",
                CreationDate: "Created_x0020_Date"
            },
            Sort: {
                Asc: "asc",
                Desc: "desc",
                Ascending: "Ascending"
            },
            Assets: {
                path: AssetsPath,
                defaultUser: "img/user-default.png",
            },
            SharedFields: {
                TAXDirections: "TAXDirections",

            },
            WebParts: {
                relativePath: relatifJsCompenentPath + "wps/"
            },
            abonnements: {
                aboSitesSettings: {
                    'core': coreTree,
                    'types': {
                        'siteregion': { 'icon': 'fa fa-globe' },
                        'default': { 'icon': 'fa fa-map-marker' }
                    },
                    'plugins': plugins,
                    version: 1,
                },
                aboTagsSettings: {
                    'core': coreTree,
                    'types': {
                        'default': { 'icon': 'fa fa-tag' }
                    },
                    'plugins': plugins,
                    version: 1,
                },
                aboMetiersSettings: {
                    'core': coreTree,
                    'types': {
                        'default': { 'icon': 'fa fa-briefcase' }
                    },
                    'checkbox': { 'keep_selected_style': false },

                    'plugins': plugins,
                    version: 1,
                },
            },
            Portail: {
                URLPage_Actus: listeActuUrl,
                Url: {
                    cachekey: "PortailUrl",
                },
                RootWebUrl: {
                    cachekey: "RootWebUrl",
                },
                SiteUrl: {
                    cachekey: "PortailUrl",
                },
                MenuNav: {
                    cachekey: "MenuNav",
                },
                RubriqueNav: {
                    cachekey: "RubriqueNav",
                },
                Actualite: {
                    ContentTypeName: "Actualite Groupe"

                },
                HomePage: {
                    viewModel: {
                        cacheKey: "HomePageViewModel",
                    },
                    Breve: {
                        Selector: "#brevesWP",
                        // Template: "#template-breves",
                        MaxRowLimit: 5,
                        TimeRefresh: 300000,//In millisecondes
                        cacheKey: "HomePages_breves",
                    },
                    OrdreFocus: {
                        Selector: "#ordreFocusWP",
                        //  Template: "#template-ordreFocusWP",
                        TimeRefresh: 300000,//In millisecondes
                        TimeRefreshCarousel: 5000,//In millisecondes
                        MaxRowLimit: 10,
                        cacheKey: "HomePages_OrdreFocus",
                        lastTime: {
                            cacheKey: "HomePages_OrdreFocus_lastTimeRefresh"
                        }
                    },
                    Actualite: {
                        Title: "Toutes les actualités nationales",
                        Url: listeActuUrl,

                    },
                    OrdreTroisActus: {
                        Selector: "#ordreFocusWP",
                        //  Template: "#template-ordreFocusWP",
                        TimeRefresh: 300000,//In millisecondes
                        MaxRowLimit: 500,
                        cacheKey: "HomePages_OrdreTroisActus"
                    },

                },
                RoleDefitions: {
                    ManagerAG2R: "Manager AG2R"
                },
                Groups: {
                    ManagerAG2R: "Manager AG2R",
                    Ag2rSocialGroup: "Ag2r Social Group"
                },
                Users: {
                    CurrentUser: {
                        groups:
                        {
                            Id: {
                                cacheKey: "CurrentUserGroupsIDs",
                            },
                            Title: {
                                cacheKey: "CurrentUSergroupsTitles",
                            }
                        },
                        Token: {
                            cacheKey: "CurrentUserToken"
                        },
                        InAg2rSocialGroupe: {
                            //Toddo : proposer de creer une page d'aministration 
                            //TODO: mettre à jour les groups
                            //  Groups: " Portail COMMUN Owners,Tous lecteurs AG2R_LM_RS",
                            Groups: "Propriétaires de declics15,Approbateurs,Ag2r Social Group",
                            cacheKey: "InAg2rSocialGroupe"
                        },
                        InAg2rAdminComGroupe: {
                            //Toddo : proposer de creer une page d'aministration 
                            //TODO: mettre à jour les groups
                            //  Groups: " Portail COMMUN Owners,Tous lecteurs AG2R_LM_RS",
                            Groups: "Propriétaires de declics15,Approbateurs,Ag2r Social Group",
                            cacheKey: "InAg2rSocialGroupe"
                        },
                        HasAg2rRoleDefinition: {
                            cacheKey: "HasAg2rRoleDefinition",
                            Groups: "Propriétaires de declics15,Approbateurs,Manager AG2R",
                        }
                    },
                },
                Webs: {
                    Proxi: {
                        Actualite: {
                            ContentTypeName: "Actualite Proximite"
                        }
                    },

                    RH: {
                        Users: {
                            CurrentUser: {
                                IsManagerAG2RLM: {
                                    //Toddo : proposer de creer une page d'aministration 
                                    Groups: "Propriétaires de declics15,Approbateurs,Manager AG2R",
                                    //    Groups: "Contributeurs RH,Lecteurs COMADIR AG2R,Lecteurs COMADIR LAMONDIALE,Lecteurs COMADIR REUNICA SYSTALIANS,Lecteurs COMOP AG2R-REUNICA, Lecteurs COMOP La Mondiale,Lecteurs RH,Portail COMMUN Owners",
                                    cacheKey: "IsManagerAG2RLM"
                                },
                                IsManagerAG2R: {
                                    Groups: "",
                                    cacheKey: "IsManagerAG2R"
                                },
                                IsLmManager: {
                                    Groups: "",
                                    cacheKey: "IsLmManager"
                                }
                            }

                        },
                        Common:
                        {
                            AsAg2r: "Collaborateur AG2R RÉUNICA",
                            AsLm: "Collaborateur La Mondiale",
                            TitleColName: "Title",
                            HeaderColName: "Ag2rHeader",
                            UrlColName: "Ag2rURL",
                            SimilarPageColName: "Ag2rText",
                            SimilarPageColNameEdit: "SimilarPageName",
                            GieColName: "RHPageGIE",
                            SimilarPageMaxRow: 100
                        },
                        Rubrique:
                        {
                            ContentType: "RH Rubrique"
                        },
                        Thematique:
                        {
                            ContentType: "Thematique",
                            TitleColName: "Title",
                            HeaderColName: "Ag2rHeader",
                            UrlColName: "Ag2rURL",
                            SimilarPageColName: "Ag2rText",
                            GieColName: "RHPageGIE",
                            IconeColName: "PublishingRollupImage"
                        },
                        MomentDeVie:
                        {
                            GoBack: "Retour",
                            ContentType: "Moment de Vie",
                            TitleColName: "Title",
                            HeaderColName: "Ag2rHeader",
                            UrlColName: "Ag2rURL",
                            SimilarPageColName: "Ag2rText",
                            GieColName: "RHPageGIE",
                            ImageColName: "PublishingPageImage"
                        }
                    }
                },
                Lists: {
                    Pages: {
                        ContentTypes: {
                            'Actualite Groupe': "0x010100C568DB52D9D0A14D9B2FDCC96666E9F2007948130EC3DB064584E219954237AF390050ED90EACCF54F11A7C74F84B9B66917",
                            'Actualite Proximite': "0x010100C568DB52D9D0A14D9B2FDCC96666E9F2007948130EC3DB064584E219954237AF3900242457EFB8B24247815D688C526CD44D009940DC7DB1AD40D99A52AB13C8C9FB36",
                            'GrandsAngles': "0x010100C568DB52D9D0A14D9B2FDCC96666E9F2007948130EC3DB064584E219954237AF39007CB1D7680A7948F0846451B1B6EC710E0081B60A87A7A4214082B155EAA56BFFB2",

                        },
                        Title: "Pages",
                        Fields: {
                            CommentsCount: "CommentsCount",
                            ReadsCount: "ReadsCount",
                            ActuImage: "ActuImage",
                            PublishingDate: "PublishingDate",
                            NewsHeader: "NewsHeader",
                            LikesCount: "LikesCount",
                            ShowStatMod: "ShowStatMod",
                            ShowCommentMod: "ShowCommentMod",
                            LikedByStringId: "LikedByStringId",
                            AdminCommentModId: "AdminCommentModId",
                            DirectionsTaxoFieldName: "DirectionsTaxoFieldName",
                            Id: "Id",
                            Audience: "Audience"
                        },
                        GrandsAngles: {
                            ContentTypeName: "GrandsAngles",
                            TaxoGroupDirection: "Portail Commun - Directions",
                            TaxoGroupMetier: "TAXMetiersProximite",
                            CustomPropertiesDirection: "Metiers",
                            CustomPropertiesMetier: "Directions",
                            AllGrandsAnglesUrl: "/Pages/Liste_Grands_Angles.aspx ",
                            Fields: {
                                TitleArticle: "TitleArticle",
                                TitleArticleSecond: "TitleArticleSecond",
                                LienImage: "LienImage",
                                Categories: "Categories",
                                PublishingDate: "PublishingDate",
                                DureeGA: "DureeGA",
                                Couleur: "Couleur",
                                TAXDirections: "TAXDirections",
                                TAXMetierProximite: "TAXMetierProximite",
                                PageUrl: "LinkFilename",
                            }
                        }
                    },
                    UsersInfo: {
                        Title: "UsersInfo" //todo if needed
                    },
                    Notifications: {
                        Title: "Notifications",
                        Url: "Lists/Notifications/"
                    },

                    Breve: {
                        Title: "Liste des brèves",
                        Fields: {
                            Audience: "Audience",
                            BreveUrl: "BreveUrl",
                            BreveChapeau: "BreveChapeau",
                            CodeCouleur: "CodeCouleur",
                            TypeBreve: "TypeBreve"
                        }
                    },
                    OrdreFocus: {
                        Title: "Ordre focus",
                        ContentTypeName: "Ordre focus",
                        ViewName: "Ordre focus",
                        Fields: orderFucusFields,
                    },
                    OrdreTroisActus: {
                        Title: "Ordre trois actus",
                        ContentTypeName: "Ordre trois actus",
                        ViewName: "Ordre trois actus",
                        Fields: orderFucusFields,
                    },
                    Carousels: {
                        Title: "Liste Carousels",
                        Fields: {
                            Title: "Title",
                            Image: "Image",
                            Header: "Description",
                            Url: "Url",
                            Ordre: "Ordre affichage",
                            Target: "Nouvelle fenetre",
                            Audience: "Audience"
                        }
                    },
                    SearchScope: {
                        Title: "SearchScope",
                        Fields: {
                            Title: "Title",
                            DisplayOrder: "DisplayOrder",
                            TargetPage: "TargetPage",
                            Url: "Url",
                            Audience: "Audience"
                        }
                    },
                    CommentsArticle: {
                        Title: "CommentairesArticles",
                        Url: "Lists/CommentairesArticles/",
                        Fields: {
                            Title: "Title",
                            TitleArticle: "TitleArticle",
                            IdArticle: "IdArticle",
                            UserComment: "UserComment",
                            OwnerComment: "OwnerComment",
                            DateComment: "DateComment",
                            ModerateurArticle: "ModerateurArticle",
                            URLActualite: "URLActualite",
                            IsAdmin: "IsAdmin"
                        },
                        GroupsAdminCommentaire: "Propriétaires de declics15,Approbateurs,Manager AG2R"
                    },
                    FamillesOutil: {
                        Title: "Familles outil",
                        cachekey: "FamillesOutil",
                        Fields: {
                            Id: "Id",
                            Titre: "Title",
                            Couleur: "Couleur",
                            DescriptionFamille: "DescriptionFamille",
                            Picto: "Picto"
                        }
                    },
                    Outils: {
                        Title: "Outils",
                        cachekey: "Outils",
                        Fields: {
                            Id: "Id",
                            Titre: "Title",
                            Audience: "Audience",
                            DescriptionOutil: "DescriptionOutil",
                            Famille: "Famille",
                            FamilleId: "FamilleId",
                            TaxGie: "TAXGIE",
                            IconOutil: "IconOutil",
                            Urloutil: "Urloutil"
                        },
                        FieldValuesAsHtml: "FieldValuesAsHtml"
                    },
                    Besoins: {
                        Title: "Besoins",
                        cachekey: "Besoins",
                        Fields: {
                            Id: "Id",
                            Titre: "Title",
                            Audience: "Audience",
                            BesoinDetail: "BesoinDetail",
                            OrdreBesoin: "OrdreBesoin",
                            Outils: "Outils"
                        }
                    },
                    NavigationTree: {
                        Title: "NavigationTree",
                        cachekey: "NavigationTree",
                        Fields: {
                            Id: "Id",
                            Titre: "Title",
                            Audience: "Audience",
                            DisplayOrder: "DisplayOrder",
                            Key: "Key",
                            Target: "Target",
                            Parent: "Parent",
                            Url: "Url"
                        }
                    },

                    Favoris: {
                        TitleSu: "Outils suggérés",
                        Title: "Favoris",
                        cachekey: "Favoris",
                        Url: "Lists/Favoris/",
                        MaxNbr: 4,
                        Fields: {
                            Id: "Id",
                            Titre: "Title",
                            Url: "Url",
                            Outil: "Outil",
                            OutilId: "OutilId",
                            Ordre: "Ordre"
                        },
                        ContentType: {
                            FavorisLiensId: "0x0100A5FC78BF585249908C0A78C9206A5555",
                            FavorisLiens: "FavorisLiens",
                            FavorisOutilsId: "0x0100A5FC78BF585249908C0A78C9206A5444",
                            FavorisOutils: "FavorisOutils"
                        }
                    },
                    LiensUtiles: {
                        Title: "Liste Liens Utiles",
                        Fields: {
                            KeyColName: "NomDuGroupe",
                            OrderColName: "Ordre",
                            TitleColName: "Title",
                            UrlColName: "Url",
                            TargetColName: "NouvelOnglet",
                            TypeColName: "TypeDocument",
                            AudienceColName: "Audience",
                            TypeDocument_Values: {
                                DocumentTypeValue: "Document",
                                LinkTypeValue: "Lien",
                                InternalLinkTypeValue: "Lien interne"
                            }
                        }
                    },
                    RubriquePrincipale: {
                        Title: "RubriquePrincipale",
                        Fields: {
                            ImageRubriqueColName: "ImageRubrique",
                            keyRubriqueColName: "keyRubrique",
                            lienRubriqueColName: "lienRubrique",
                            OrdreRubriqueColName: "OrdreRubrique",
                            TitleColName: "Title",
                            AudienceColName: "Audience"
                        }
                    },
                    RubriqueSecondaire: {
                        Title: "RubriqueSecondaire",
                        Fields: {
                            PictoRubriqueColName: "PictoRubrique",
                            keyRubriqueColName: "keyRubrique",
                            lienRubriqueColName: "lienRubrique",
                            OrdreRubriqueColName: "OrdreRubrique",
                            TitleColName: "Title",
                            AudienceColName: "Audience"
                        }
                    },
                    Epingler: {
                        Title: "Les pages epinglees",
                        Url: "Lists/Les%20pages%20epinglees/",
                        Css: {
                            ClassActive: "pinned"

                        },
                        Fields: {
                            PublishingDateColName: "PublishingDate",
                            DescriptionColName: "KpiDescription",
                            UrlColName: "Url",
                            UrlImageColName: "UrlImage",
                            AudienceColName: "Audience",
                            IdPageId: "IdPage_x003A_ID"
                        }
                    },
                    TempsForts: {
                        Title: "Liste Temps forts",
                        Fields: {
                            ChapeauColName: "Chapeau",
                            CleRubriqueColName: "CleRubrique",
                            ContenuColName: "Contenu",
                            CouleurColName: "Couleur",
                            TitleColName: "Title",
                            AudienceColName: "Audience"
                        }
                    },
                    Accordeons: {
                        Title: "Liste Accordeons",
                        Fields: {
                            ChapeauColName: "Chapeau",
                            CleColName: "Cle",
                            ContenuColName: "Contenu",
                            TitleColName: "Title",
                            AudienceColName: "Audience"
                        }
                    },
                    ParamSoumettreActu: {
                        Title: "Liste Parametres Formulaire Actu",
                        //TODO remove this
                        Url: "https://ppalm.sharepoint.com/sites/declics_online_ri/Pages/Soumettre_actualite.aspx",
                        Fields: {
                            InboxColName: "BoiteReception",
                            SubjectColName: "SujetEmail",
                            PostFormMessageColName: "Title",
                            SuccessMessageColName: "MessageSucces",
                            ErrorMessageColName: "MessageErreur",

                        }
                    },
                    RubriqueMenu: {
                        Title: "RubriqueMenu",
                        Fields: {
                            Titre: "Title",
                            SelectionMenu: "SelectionMenu",
                            TitleRubriqueMenu: "TitleRubriqueMenu",
                            SousTitleRubriqueMenu: "SousTitleRubriqueMenu",
                            ImageRubriqueMenu: "ImageRubriqueMenu",
                            DescriptionRubriqueMenu: "DescriptionRubriqueMenu"
                        }
                    }
                }


            }
        };
})();
