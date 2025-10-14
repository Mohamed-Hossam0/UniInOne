public class Main {
    public static void main(String[] args) {
       LinkedPositionalList2<Integer> pl=new LinkedPositionalList2<>();
        pl.addLast(1);
        pl.addLast(2);
        pl.addLast(3);
        pl.addLast(4);
        pl.addLast(5);
      LinkedPositionalList2<Integer> p2=pl.reverse();
        Position<Integer> p=p2.first();
        while (p!=null) {
            System.out.println(p.getElement());
            p=p2.after(p);
        }
    }
}