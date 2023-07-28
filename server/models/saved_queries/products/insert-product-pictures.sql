
-- pet food
update ecommerce_db.products
set `image` = ELT(
    FLOOR(RAND()*8)+1, 
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/f92ec7ed-f753-43c1-ab80-f80a662d4400/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/58a35ce5-5717-4229-604f-3405a5484d00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/ddafaecb-1356-45c0-cb6d-dd15c7967200/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/0ea17aa8-1eea-47fe-08de-83c3b122ba00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/e50cd081-cfe3-4829-4abb-1b5bbbe94100/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/7e97131f-6e85-46e8-9314-d00c21c1be00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/573c48fc-6599-4600-c20a-03b9d708b200/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/1d17de58-0b77-42dc-562c-d9f68b5eef00/public')

where id > 0 and product_category_id = 1;

select * from ecommerce_db.products
where product_category_id = 1 and id > 0;

-- treats
update ecommerce_db.products
set `image` = ELT (
    FLOOR(RAND()*7)+1,
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/6810b042-133f-498e-9f94-bf95a2dd9500/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/4049c189-08f3-4ca1-c3c6-8540d870d100/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/e45683d7-a0cf-4232-ecd0-7eee799b7800/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/0f313a16-b614-48c8-76e0-7f649845bf00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/e81d5c6b-2d98-4983-d762-ccc00a9a9600/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/f95a0a5f-f6f3-4b24-1a87-41f515fcee00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/2b8414da-0690-4f55-d79a-8ce54cf98000/public')
where id > 0 and product_category_id = 2;

select * from ecommerce_db.products
where product_category_id = 2 and id > 0;

-- bedding and furniture
update ecommerce_db.products
set `image` = ELT (
    FLOOR(RAND()*10)+1,
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/2d4f8de8-b3d9-44b4-9c60-8133f48fcb00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/e45d4238-0654-4e3e-97cd-920c2df57f00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/7c2d0820-d15c-4ee0-eee9-071046f31600/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/681555a3-8da6-4de2-3fa9-77f9185c9600/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/8473a218-2a75-4390-3059-236e59d36b00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/570dc80e-a709-4bbf-cde2-493a7c6af900/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/5f5a37f6-fa6d-459c-b598-6d17df8e9c00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/829a6dec-1e63-43d0-b6ef-1d39ad1a5900/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/6080a6c1-5115-4367-4673-63083e3d9600/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/e922957c-6790-4048-c439-d8899b108800/public')
where id > 0 and product_category_id = 3;

select * from ecommerce_db.products
where product_category_id = 3 and id > 0;

-- grooming and fur care
update ecommerce_db.products
set `image` = ELT (
    FLOOR(RAND()*10)+1,
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/72df5eca-8678-4f49-3080-e92c8c48c900/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/2aca00c2-af5f-4839-4c22-98eeef3dbc00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/f201eed5-cce4-4a94-0425-37f1b1de4800/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/08bc7afe-85f0-4cde-dea3-29642fff7100/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/38c53f93-57ae-434d-aa5c-c6baecdbac00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/84b78dba-53cf-4887-eb60-c5f29de44000/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/fb5773b6-3990-44a4-f0d4-17947a36e200/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/4beb6c43-fb57-442e-3f86-187fa72de000/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/b8a18c65-6229-404d-3a85-665a6afa8300/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/d0c4c670-2cd8-411e-05cb-e40274c96400/public')
where id > 0 and product_category_id = 4;

select * from ecommerce_db.products
where product_category_id = 4 and id > 0;

-- medicines
update ecommerce_db.products
set `image` = ELT (
    FLOOR(RAND()*6)+1,
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/45c0db1e-b593-48d1-813e-2225503aec00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/e9892cae-78fe-4ace-643d-652ce4ceef00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/42430bc9-9c1d-46c0-194e-4b665b834400/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/fa560bf9-0412-403b-e19c-b58bb0c99b00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/5e7ca493-195d-45fa-3f4c-62654e548000/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/85be607a-aae8-4ca3-46da-2e115402f600/public')
where id > 0 and product_category_id = 5;

select * from ecommerce_db.products
where product_category_id = 5 and id > 0;

-- pet toys
update ecommerce_db.products
set `image` = ELT (
    FLOOR(RAND()*9)+1,
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/e81d998a-93c7-4682-5edb-e15bb2987700/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/16fc8ed9-4647-4a19-d417-1d6f3fe75c00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/94dc6223-1932-492c-a528-286d84da0b00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/075ff9bd-60e6-474a-4878-d0aa0a260100/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/00a196f1-d77f-495a-79f7-23d16b621e00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/5228e005-92fc-4404-1a03-adfe097db000/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/dac1f5b7-ccf0-4067-bf4d-0462088be600/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/3a7b2a2c-aadc-48b8-9bee-ae2642890900/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/cf992517-31e2-41fb-894f-ee2d54838800/public')
where id > 0 and product_category_id = 6;

select * from ecommerce_db.products
where product_category_id = 6 and id > 0;

-- collars and leashes
update ecommerce_db.products
set `image` = ELT (
    FLOOR(RAND()*26)+1,
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/a4309ec8-d4d3-4636-03a4-67431362e800/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/9ca40405-9407-4338-37b6-caad98938700/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/390284d2-8eb5-4501-8acb-962880788b00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/a60d1526-186f-4fa0-86b9-cff20368d500/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/fedefd81-8fcc-457d-c6b4-ecc1f0744300/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/f25ed84f-3ed1-4b4a-7662-2e6cf3b82600/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/1ddb0028-2553-42cf-eb4e-aaea20b2c400/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/64ea130f-6181-4628-313f-94541eea2d00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/6ca8c51b-5ea3-4649-a4b1-11575364b600/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/4a63b62e-aa9a-46be-eab0-38bbc7311000/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/da64e85b-922f-4745-f696-12fbcba82f00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/c196efb1-a8e4-4c8c-22be-02273bbfc800/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/b4660eb7-7033-48e2-6c8d-f13b2a1a1f00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/9428f140-7182-404e-2271-85ba380f7f00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/0abf9a03-b6ba-4566-e2c4-5cd802e7d600/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/5092a7de-2d52-4178-57fc-eb04566a2f00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/6a183486-638c-442a-483b-425ea2b87d00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/b479ff41-e24a-46d7-7208-5b56e20fc900/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/6d9b893b-e6af-4201-12f0-e93cb7a15e00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/e47989ec-235a-4c81-5a6e-cbbcb0894600/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/5cc3ff2b-19b8-4e36-05f3-b1bd0d31d100/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/69aced0a-9e0d-4f13-6ef1-8ffcd198fe00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/44773632-ba7b-433a-38ba-eb243b69b800/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/334b211c-b2a2-46f7-63ca-b2d999787200/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/95b6235b-ae1e-4c29-b149-04ff21116c00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/c0d8476d-6be0-4580-55eb-838fec679100/public')
where id > 0 and product_category_id = 7;

select * from ecommerce_db.products
where product_category_id = 7 and id > 0;

-- cat litter
update ecommerce_db.products
set `image` = ELT (
    FLOOR(RAND()*14)+1,
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/1f07cfa0-ee4f-4a71-a952-fae4572dad00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/f8b123c2-7838-436a-d0cd-1e86d7342300/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/d1f67611-c4ba-47d7-7684-4f6968d03400/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/afdd1949-4c5e-403f-30ef-813f5d497a00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/c3a1d2d9-254b-4233-ab64-98e0c69c6500/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/aba54955-754b-4641-b6e8-195aae970a00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/71685040-aecc-45d1-e790-6f6381e1a300/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/41307c97-e989-4c18-5ce4-cc5e1295bc00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/926d2352-4da4-4431-05b0-a4a6bd622a00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/eb003624-6a36-4632-6b5c-85c474334100/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/f4a037ab-1ca8-458b-4f3c-e56bb1869400/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/bba7e178-5350-4ce9-f5ef-15f543ff7800/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/79d8fce8-06b1-4259-af8e-f8f6d4904000/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/7428c6cf-e5dd-4597-4bda-2926a8cfff00/public')
where id > 0 and product_category_id = 8;

select * from ecommerce_db.products 
where product_category_id = 8 and id > 0;

-- bird and hamster habitat supplies
update ecommerce_db.products
set `image` = ELT (
    FLOOR(RAND()*29)+1,
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/5a7c407e-c572-4f2b-2340-d6d63b442f00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/433c3abc-2611-4c38-0ff4-b5f862391600/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/61c95b49-9d51-42e7-4ab9-8b5011a3f500/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/1ce9aae8-38ec-49df-3e78-7da4813d0f00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/e482528d-24d0-4d45-9ae9-fd93e6484c00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/5faa5833-f630-4f6a-1fae-e766d63d4900/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/f01464c1-a45c-4df4-e4d5-2d9893582c00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/2c633004-34c2-4dd0-8a6e-e1b2a0c20a00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/7c3f9523-a852-4888-483b-44bd6f323f00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/8c2bd5dc-96a0-4236-379a-4a41c5b19000/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/268e5fad-977f-4661-3e97-255deea8cf00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/8a772ade-27d2-4c3c-b9a1-91827c10ed00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/45633626-c958-45ac-f2ff-5fd47ffc6d00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/653b32af-d37d-4ece-76fd-0b7608ec1100/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/a9603ef7-f3e1-488c-59b6-dbd9a42ee700/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/15744922-1cab-48c7-678a-22e8209bd400/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/ee3dbf64-ff64-478a-8307-b90aa02dd500/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/135a00b0-7bfa-4515-8224-83d169462000/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/2d18b82f-5e67-40a9-6c19-74f58502d400/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/f191a1cd-ca92-4ce8-d5e4-44b412f31900/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/c1791bd8-37fc-4e79-9009-144acd970300/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/03834e5d-7b86-4113-9009-53c6e9956200/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/8b5e6d44-0891-4dff-13da-24f04a6e0200/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/056cd2f2-9e7c-424f-b4e8-45aefddc6400/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/9ab8ea45-e237-41d4-9aec-2ccfeedde900/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/fcd37edb-e757-44a4-59bb-278f7a596b00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/87a13fa4-a1a3-4626-fbf8-218caea99500/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/2e86e206-475e-45b9-58a6-893ae95c1300/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/7c2595a5-7fdd-4e4b-14f2-1c4274a1d900/public')
where id > 0 and product_category_id = 9;

select * from ecommerce_db.products 
where product_category_id = 9 and id > 0;