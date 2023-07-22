update ecommerce_db.product_pet_types
-- 	set image_thumbnail_url = ( case
-- 		when pet_name = 'Dogs' then 'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/27fb63ea-dc82-4014-c384-653d165a3e00/public'
--         when pet_name = 'Cats' then 'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/33ed6a85-d720-4d60-1b25-6df90879a600/public'
--         when pet_name = 'Birds' then 'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/17f01819-82d8-4cd6-b975-afb890a96f00/public'
--         when pet_name = 'Hamsters, Guinea Pigs, Rabbits & Small Mammals' then 'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/880eb448-b6a1-4f5b-1805-4ff2edf4fd00/public'
--         when pet_name = 'Reptiles' then 'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/e759e179-b0db-44f2-397c-321482fe9700/public'
--         
--         end)
--         where id > 0 and id<10
-- 	;
    set pet_name = 'Small Mammals'
    where url_formatted_name = 'small-mammals' and id = 4;
    
select * from ecommerce_db.product_pet_types;