delete from ecommerce_db.product_categories where id>0;
commit;
select * from ecommerce_db.product_categories;
